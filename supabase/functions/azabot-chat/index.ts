const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (!LOVABLE_API_KEY) {
    return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'messages array required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const systemMessage = {
      role: 'system',
      content: `أنت عزبوت (AzaBot)، المساعد الذكي لمنصة العزب. أنت متخصص في مساعدة المستخدمين بخدمات الصيانة والتشطيب.

معلومات عن الشركة:
- نقدم خدمات صيانة شاملة (كهرباء، سباكة، تكييف، دهانات، نجارة)
- خدمات تشطيب احترافية للمنازل والمكاتب
- لدينا فروع في الرياض، جدة، الدمام
- أسعار تنافسية مع ضمان على جميع الأعمال
- خدمة عملاء 24/7
- فريق فنيين معتمدين ومدربين

أجب بشكل مختصر ومفيد باللغة العربية. إذا سُئلت بالإنجليزية أجب بالإنجليزية.
كن ودوداً ومحترفاً. استخدم الإيموجي باعتدال.`
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [systemMessage, ...messages],
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`AI API error [${response.status}]: ${errorText}`)
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'عذراً، لم أتمكن من المعالجة.'

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('AzaBot error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
