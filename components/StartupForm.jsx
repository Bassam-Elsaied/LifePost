"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
import { formSchema } from "@/lib/zod";

/**
 * StartupForm Component
 * Handles the creation of new startup pitches with form validation and markdown editing
 */
const StartupForm = () => {
  // State management for form
  const [errors, setErrors] = useState({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  /**
   * Handles form submission and validation
   * @param {Object} prevState - Previous form state
   * @param {FormData} formData - Form data from submission
   */
  const handleFormSubmit = async (prevState, formData) => {
    try {
      // Extract form values
      const formValues = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        link: formData.get("link"),
        pitch,
      };

      // Validate form data against schema
      await formSchema.parseAsync(formValues);

      // Submit pitch to backend
      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        // Fixed loose equality to strict
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
          className: "bg-green-500 text-white",
        });

        // Redirect to the new startup page
        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors; // Fixed typo in variable name
        setErrors(fieldErrors);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
          className: "bg-red-500 text-white",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      // Handle unexpected errors
      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
        className: "bg-red-500 text-white",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  // Initialize form action state
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  // Form field configuration for DRY code
  const formFields = [
    {
      id: "title",
      label: "Title",
      component: Input,
      placeholder: "Startup Title",
    },
    {
      id: "description",
      label: "Description",
      component: Textarea,
      placeholder: "Startup Description",
    },
    {
      id: "category",
      label: "Category",
      component: Input,
      placeholder: "Startup Category (Tech, Health, Education...)",
    },
    {
      id: "link",
      label: "Image URL",
      component: Input,
      placeholder: "Startup Image URL",
    },
  ];

  return (
    <form action={formAction} className="startup-form">
      {/* Render form fields dynamically */}
      {formFields.map(({ id, label, component: Component, placeholder }) => (
        <div key={id}>
          <label htmlFor={id} className="startup-form_label">
            {label}
          </label>
          <Component
            id={id}
            name={id}
            className={`startup-form_${id === "description" ? "textarea" : "input"}`}
            required
            placeholder={placeholder}
          />
          {errors[id] && <p className="startup-form_error">{errors[id]}</p>}
        </div>
      ))}

      {/* Markdown Editor Section */}
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={setPitch} // Simplified callback
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
