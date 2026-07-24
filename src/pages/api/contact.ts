// import type { APIRoute } from "astro";
// import { Resend } from "resend";

// const resend = new Resend(import.meta.env.RESEND_API_KEY);

// export const POST: APIRoute = async ({ request }) => {
//   try {
//     const formData = await request.formData();

//     const name = String(formData.get("name") || "");
//     const email = String(formData.get("email") || "");
//     const phone = String(formData.get("phone") || "");
//     const subject = String(formData.get("subject") || "");
//     const message = String(formData.get("message") || "");
//     const consent = formData.get("consent");

//     if (!name || !email || !message || !consent) {
//       return new Response(
//         JSON.stringify({
//           message: "Veuillez compléter tous les champs obligatoires.",
//         }),
//         {
//           status: 400,
//         }
//       );
//     }

//     const emailRegex =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       return new Response(
//         JSON.stringify({
//           message: "Adresse e-mail invalide.",
//         }),
//         {
//           status: 400,
//         }
//       );
//     }

//     await resend.emails.send({
//       from: "Site cabinet <onboarding@resend.dev>",
//       to: [import.meta.env.CONTACT_EMAIL],
//       replyTo: email,
//       subject:
//         subject || "Nouvelle demande via le formulaire",

//       html: `
//         <h2>Nouvelle demande de contact</h2>

//         <p><strong>Nom :</strong> ${name}</p>
//         <p><strong>Email :</strong> ${email}</p>
//         <p><strong>Téléphone :</strong> ${phone}</p>
//         <p><strong>Objet :</strong> ${subject}</p>

//         <hr>

//         <p>${message.replace(/\n/g, "<br>")}</p>
//       `,
//     });

//     return new Response(
//       JSON.stringify({
//         message:
//           "Votre demande a bien été envoyée.",
//       }),
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.error(error);

//     return new Response(
//       JSON.stringify({
//         message:
//           "Une erreur est survenue lors de l'envoi.",
//       }),
//       {
//         status: 500,
//       }
//     );
//   }
// };