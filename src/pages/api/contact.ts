import type { APIRoute } from "astro";
// import type { success } from "astro:schema";
import { Resend } from "resend";
import { ContactSchema } from "../../lib/contactSchema";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const CONTACT_EMAIL =import.meta.env.CONTACT_EMAIL;

    try {
        const body = await request.json();
      
        const result = ContactSchema.safeParse(body);
        
        if (!result.success) {
            return new Response(
                JSON.stringify({
                    success: false,
                     errors: result.error.flatten().fieldErrors,
                }),
                {
                    status: 400,
                     headers: {
            "Content-Type": "application/json",
          },
                }
            );
        }

    const {
  name,
  email,
  phone,
  subject,
  message,
} = result.data;

 const { data, error } = await resend.emails.send({
  from: "Site Maître Camille Herlido <contact@herlido-avocat.fr>",
  to: CONTACT_EMAIL,
  replyTo: email,
  subject: subject || `Nouvelle demande de contact - ${name}`,

  html: `
    <div style="
      font-family: Arial, Helvetica, sans-serif;
      color: #1f2937;
      line-height: 1.6;
      max-width: 650px;
      margin: auto;
      padding: 24px;
      background-color: #ffffff;
    ">

      <div style="
        background-color: #abc4ff;
        padding: 20px;
        border-radius: 12px 12px 0 0;
      ">
        <h1 style="
          margin: 0;
          color: #1f2937;
          font-size: 22px;
        ">
          Nouvelle demande de contact
        </h1>
      </div>

      <div style="
        border: 1px solid #e5e7eb;
        border-top: none;
        padding: 24px;
        border-radius: 0 0 12px 12px;
      ">

        <p>
          Une nouvelle personne a envoyé un message depuis le formulaire de contact du site.
        </p>

        <hr style="
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 24px 0;
        " />

        <h2 style="
          font-size: 16px;
          color: #2563eb;
          margin-bottom: 12px;
        ">
          Coordonnées
        </h2>

        <p>
          <strong>Nom :</strong><br />
          ${name}
        </p>

        <p>
          <strong>Email :</strong><br />
          <a href="mailto:${email}" style="color:#2563eb;">
            ${email}
          </a>
        </p>

        <p>
          <strong>Téléphone :</strong><br />
          ${phone || "Non renseigné"}
        </p>

        <h2 style="
          font-size: 16px;
          color: #2563eb;
          margin-top: 24px;
          margin-bottom: 12px;
        ">
          Message
        </h2>

        ${
          subject
            ? `
              <p>
                <strong>Objet :</strong><br />
                ${subject}
              </p>
            `
            : ""
        }

        <div style="
          background-color: #f9fafb;
          border-radius: 8px;
          padding: 16px;
          margin-top: 16px;
          white-space: pre-line;
        ">
          ${message}
        </div>

      </div>

      <p style="
        text-align: center;
        font-size: 12px;
        color: #6b7280;
        margin-top: 20px;
      ">
        Message envoyé automatiquement depuis le site internet du cabinet.
      </p>

    </div>
  `,
});
  if (error) { 
    console.error("Erreur Resend :", error);
     return new Response( JSON.stringify({ success: false, resendError: error, }),
      { status: 500, headers: { "Content-Type": "application/json", },
     } ); }

console.log("Email envoyé avec succès :", data);

 return new Response( 
  JSON.stringify({ success: true, }),
  { status: 200,
     headers: { "Content-Type": "application/json", },
     } );

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Erreur serveur",
      }),
      {
        status: 500,
      }
    );
  }
};
