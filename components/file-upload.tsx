// "use client";

// import { UploadDropzone } from "@/lib/uploadthing";
// import { X, FileText } from "lucide-react";
// import Image from "next/image";

// interface FileUploadProps {
//   onChange: (url?: string) => void;
//   value: string;
//   endpoint: "messageFile" | "serverImage";
// }

// export const FileUpload = ({
//   onChange,
//   value,
//   endpoint,
// }: FileUploadProps) => {
//   const fileType = value?.split(".").pop()?.toLowerCase();

//   // Image preview
//   if (value && fileType !== "pdf") {
//     return (
//       <div className="relative h-20 w-20">
//         <Image
//           fill
//           src={value}
//           alt="Upload"
//           className="rounded-full object-cover"
//         />

//         <button
//           onClick={() => onChange("")}
//           className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
//           type="button"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>
//     );
//   }

//   // PDF preview
//   if (value && fileType !== "pdf") {
//   return (
//     <div className="flex justify-center">
//       <div className="relative h-24 w-24">
//         <Image
//           fill
//           src={value}
//           alt="Upload"
//           className="rounded-full object-cover"
//         />

//         <button
//           onClick={() => onChange("")}
//           className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-md"
//           type="button"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// }


//   // Upload UI
//   return (
//     <div className="flex justify-center w-full">
//       <div className="w-[260px]">
//         <UploadDropzone
//           endpoint={endpoint}
//           onClientUploadComplete={(res) => {
//             onChange(res?.[0].fileUrl);
//           }}
//           onUploadError={(error) => {
//             console.log("Upload error:", error);
//           }}
//           appearance={{
//             container:
//               "border border-dashed rounded-lg p-6 text-center flex flex-col items-center justify-center gap-2",
//             label: "text-sm text-gray-600",
//             uploadIcon: "w-10 h-10 text-gray-400",
//             button:
//               "bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600",
//           }}
//           content={{
//             label: "Choose a file or drag and drop",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X, FileText } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
  onChange,
  value,
  endpoint,
}: FileUploadProps) => {
  const fileType = value?.split(".").pop()?.toLowerCase();

  // IMAGE PREVIEW
  if (value && fileType !== "pdf") {
    return (
      <div className="flex justify-center">
        <div className="relative h-24 w-24">
          <Image
            fill
            src={value}
            alt="Upload"
            className="rounded-full object-cover"
          />

          <button
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-md"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // PDF PREVIEW
  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center gap-2 border rounded-md p-2">
        <FileText className="h-6 w-6 text-indigo-500" />
        <span className="text-sm truncate">PDF Uploaded</span>

        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // UPLOAD UI
  return (
    <div className="flex justify-center w-full">
      <div className="w-[260px]">
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            onChange(res?.[0]?.url); // IMPORTANT FIX
          }}
          onUploadError={(error) => {
            console.log("Upload error:", error);
          }}
          appearance={{
            container:
              "border border-dashed rounded-lg p-6 text-center flex flex-col items-center justify-center gap-2",
            label: "text-sm text-gray-600",
            uploadIcon: "w-10 h-10 text-gray-400",
            button:
              "bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600",
          }}
          content={{
            label: "Choose a file or drag and drop",
          }}
        />
      </div>
    </div>
  );
};
