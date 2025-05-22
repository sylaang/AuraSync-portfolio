"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare, Github, Linkedin } from "lucide-react"
import { useState, useRef } from "react"
import emailjs from "emailjs-com"
import ReCAPTCHA from "react-google-recaptcha"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// Validation schema avec yup
const schema = yup.object({
  name: yup.string().required("Le nom est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  confirmEmail: yup.string()
    .oneOf([yup.ref('email')], "Les emails ne correspondent pas")
    .required("Veuillez confirmer votre email"),
  message: yup.string().required("Le message est obligatoire"),
}).required()

type FormInputs = yup.InferType<typeof schema>

type ContactInfoItem = {
  icon: JSX.Element
  label: string
  value: string
}

const contactInfo: ContactInfoItem[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6 text-primary"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ), label: "Email", value: "mehdi.hachem.syl@gmail.com"
  },
]

const socialLinks = [
  { icon: <Github className="w-6 h-6" />, label: "Github", url: "https://github.com/sylaang/" },
  { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", url: "https://www.linkedin.com/in/mehdi-hachem-54a8672b0/" },
]

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [captchaError, setCaptchaError] = useState<string | null>(null)  // <-- nouvel état pour erreur captcha

  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormInputs) => {
    if (!recaptchaToken) {
      // Remplace alert par un message visible
      setCaptchaError("Merci de valider le captcha avant d'envoyer le formulaire.")
      return
    }
    setCaptchaError(null) // reset erreur captcha si ok

    setIsSubmitting(true)

    const now = new Date().toLocaleString("fr-FR", {
      dateStyle: "full",
      timeStyle: "short",
    })

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        name: data.name,
        email: data.email,
        message: data.message,
        time: now,
        "g-recaptcha-response": recaptchaToken,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
      .then(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
        reset()
        setRecaptchaToken(null)
        recaptchaRef.current?.reset()

        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      })
      .catch((error) => {
        setIsSubmitting(false)
        alert("Une erreur est survenue : " + error.text)
      })
  }

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
    if (token) setCaptchaError(null) // clear erreur dès que captcha validé
  }

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Prenons contact</h2>
          <p className="text-lg text-muted-foreground">
            Un projet web, une idée de site à concrétiser ou juste une question ? Je serais ravi d’échanger avec vous.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Informations de contact</h3>
            <p className="text-muted-foreground mb-8">
              Vous avez un projet web en tête ? N’hésitez pas à me contacter via l’un des canaux ci-dessous. Je réponds généralement sous 24 heures.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i + 0.3 }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8">
              <h4 className="text-lg font-medium mb-4">Connectons-nous</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Envoyez-moi un message
              </h3>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-4 rounded-md"
                  >
                    <p className="font-medium">Message envoyé avec succès !</p>
                    <p className="text-sm">Merci de nous avoir contacté. Je reviendrai vers vous dès que possible.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    noValidate
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Votre nom"
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                      {errors.name && (
                        <p role="alert" className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="Votre email"
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      {errors.email && (
                        <p role="alert" className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmEmail">Confirmer l'email</Label>
                      <Input
                        id="confirmEmail"
                        type="email"
                        {...register("confirmEmail")}
                        placeholder="Confirmez votre email"
                        aria-invalid={errors.confirmEmail ? "true" : "false"}
                      />
                      {errors.confirmEmail && (
                        <p role="alert" className="text-red-600 text-sm mt-1">{errors.confirmEmail.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Votre message"
                        rows={5}
                        aria-invalid={errors.message ? "true" : "false"}
                      />
                      {errors.message && (
                        <p role="alert" className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="pt-4">
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={onRecaptchaChange}
                        ref={recaptchaRef}
                      />
                      {/* Message d'erreur captcha visible sous le captcha */}
                      {captchaError && (
                        <p role="alert" className="text-red-600 text-sm mt-2">{captchaError}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
