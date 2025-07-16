// "use client";

// import { useState, ChangeEvent, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// export default function CreateStoryPage() {
//   const [caption, setCaption] = useState("");
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const router = useRouter();

//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//   const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setImageFile(e.target.files[0]);
//     } else {
//       setImageFile(null);
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setErrorMsg("You must be logged in");
//         setLoading(false);
//         return;
//       }

//       if (!cloudName || !uploadPreset) {
//         throw new Error("Cloudinary configuration is missing");
//       }

//       let imageUrl = "";

//       if (imageFile) {
//         const formDataCloud = new FormData();
//         formDataCloud.append("file", imageFile);
//         formDataCloud.append("upload_preset", uploadPreset);

//         const cloudRes = await fetch(
//           `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//           {
//             method: "POST",
//             body: formDataCloud,
//           }
//         );

//         if (!cloudRes.ok) {
//           throw new Error("Failed to upload image to Cloudinary");
//         }

//         const cloudData = await cloudRes.json();
//         imageUrl = cloudData.secure_url;
//       }

//       const storyData = {
//         caption,
//         mediaType: imageUrl ? "image" : "text",
//         mediaUrl: imageUrl || null,
//       };

//       const response = await fetch("https://chatify-project-backend.vercel.app/api/v1/story/createStory", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(storyData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to create story");
//       }

//       router.push("/story/me");
//     } catch (error: any) {
//       setErrorMsg(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Create New Story</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <textarea
//           placeholder="Write something..."
//           className="border p-2 rounded resize-none"
//           rows={4}
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           disabled={loading}
//         />

//         <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />

//         {errorMsg && <p className="text-red-500">{errorMsg}</p>}

//         <Button type="submit" disabled={loading}>
//           {loading ? "Posting..." : "Post Story"}
//         </Button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CreateStoryPage() {
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMsg("You must be logged in");
        setLoading(false);
        return;
      }

      if (!caption.trim() && !imageFile) {
        setErrorMsg("Please write something or upload an image.");
        setLoading(false);
        return;
      }

      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary configuration is missing");
      }

      let imageUrl = "";

      if (imageFile) {
        const formDataCloud = new FormData();
        formDataCloud.append("file", imageFile);
        formDataCloud.append("upload_preset", uploadPreset);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formDataCloud,
          }
        );

        if (!cloudRes.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }

        const cloudData = await cloudRes.json();
        imageUrl = cloudData.secure_url;
      }

      const storyData = {
        caption,
        mediaType: imageUrl ? "image" : "text",
        mediaUrl: imageUrl || "no url",
      };

      const response = await fetch("https://chatify-project-backend.vercel.app/api/v1/story/createStory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(storyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create story");
      }

      router.push("/story/me");
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Create New Story</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <textarea
          placeholder="Write something..."
          className="border border-gray-300 dark:border-gray-700 rounded-md p-3 resize-none text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={5}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          disabled={loading}
        />

        <label className="block text-gray-700 dark:text-gray-300">
          <span className="mb-2 block font-medium">Upload Image (optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100
              dark:file:bg-indigo-900 dark:file:text-indigo-300
              dark:hover:file:bg-indigo-800"
          />
        </label>

        {/* عرض معاينة الصورة */}
        {imagePreview && (
          <div className="relative w-full h-60 rounded-md overflow-hidden border border-gray-300 dark:border-gray-700">
            <img
              src={imagePreview}
              alt="Preview"
              className="object-contain w-full h-full"
            />
            <button
              type="button"
              onClick={() => setImageFile(null)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 focus:outline-none"
              title="Remove image"
            >
              ×
            </button>
          </div>
        )}

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Story"}
        </Button>
      </form>
    </div>
  );
}
