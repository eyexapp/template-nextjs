"use server";

/**
 * Example Server Action — replace with your own actions.
 *
 * Server Actions run on the server and can be called directly from components.
 * Use them for data mutations (form submissions, database writes, etc.)
 *
 * Usage in a component:
 *   import { exampleAction } from "@/services/actions/example.action";
 *
 *   // In a form:
 *   <form action={exampleAction}>
 *
 *   // Or programmatically:
 *   const result = await exampleAction(formData);
 */
export async function exampleAction(formData: FormData) {
  const name = formData.get("name") as string;

  if (!name || name.trim().length === 0) {
    return { success: false, message: "Name is required." };
  }

  // TODO: Replace with actual business logic (database call, API request, etc.)
  return { success: true, message: `Hello, ${name}!` };
}
