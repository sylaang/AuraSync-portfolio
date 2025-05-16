import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { name, email, message, "g-recaptcha-response": token } = await request.json()

  if (!token) {
    return NextResponse.json({ error: "Captcha manquant" }, { status: 400 })
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  // Vérification reCAPTCHA
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
  const response = await fetch(verificationURL, { method: "POST" })
  const data = await response.json()

  if (!data.success) {
    return NextResponse.json({ error: "Captcha invalide" }, { status: 400 })
  }

  try {
    const emailjsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        template_params: {
          name,
          email,
          message
        }
      }),
    })

    if (!emailjsResponse.ok) {
      const errorText = await emailjsResponse.text()
      console.error("Erreur EmailJS:", errorText)
      return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
    }

    return NextResponse.json({ message: "Email envoyé avec succès" }, { status: 200 })

  } catch (error) {
    console.error("Erreur serveur :", error)
    return NextResponse.json({ error: "Erreur serveur lors de l'envoi de l'email" }, { status: 500 })
  }
}