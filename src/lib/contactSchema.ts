import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2,"Veuillez renseigner votre nom.")
    .max(100),

  email: z
    .string()
    .trim()
    .email("Veuillez saisir une adresse e-mail valide."),

  phone: z
    .string()
    .trim()
     .regex(
    /^(\+33|0)[1-9](?:[\s.-]?\d{2}){4}$/,
    "Veuillez saisir un numéro de téléphone valide."
  )
  .optional()
  .or(z.literal("")),

  subject: z
    .string()
    .trim()
    .max(150, "L'objet ne peut pas dépasser 150 caractères.")
    .optional(),

  message: z
    .string()
    .trim()
    .min(50, "Votre message doit contenir au moins 50 caractères afin de nous permettre de comprendre votre demande.")
    .max(3000 ,
    "Votre message ne peut pas dépasser 3000 caractères."),

    
  consent: z.literal(true, "Vous devez accepter le traitement de vos données.")
});