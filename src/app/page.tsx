import { redirect } from "next/navigation";

/** Le rapport Caserne est la page d’entrée ; le gate mot de passe enveloppe
 *  toujours l’ensemble depuis le layout racine. */
export default function Page() {
  redirect("/caserne");
}
