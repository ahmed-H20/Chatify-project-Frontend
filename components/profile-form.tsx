// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Camera } from "lucide-react";

// export default function ProfileForm() {
//   const [name, setName] = useState("Jason Doe");
//   const [email, setEmail] = useState("jason@gmail.com");
//   const [image, setImage] = useState("/icons/user.png");

//   console.log(image)

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImage(url);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ name, email, image });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white text-[#333] px-4">
//       <div className="bg-white border border-[#ddd] w-full max-w-md p-6 rounded-xl shadow-lg">
//         <h2 className="text-center text-xl font-semibold text-[#341F97] mb-1">Profile</h2>
//         <p className="text-center text-gray-500 text-sm mb-6">Your profile information</p>

//         {/* Avatar */}
//         <div className="relative w-28 h-28 mx-auto mb-6">
//           <Image
//             src={image}
//             alt="Profile"
//             width={112}
//             height={112}
//             className="rounded-full object-cover border-4 border-[#eee]"
//           />
//           <label className="absolute bottom-0 right-0 bg-[#341F97] text-white p-1 rounded-full cursor-pointer shadow">
//             <Camera size={16} />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </label>
//         </div>

//         {/* Full Name */}
//         <div className="mb-4">
//           <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full bg-[#f9f9f9] text-black p-2 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#341F97]"
//           />
//         </div>

//         {/* Email Address */}
//         <div className="mb-6">
//           <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full bg-[#f9f9f9] text-black p-2 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#341F97]"
//           />
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="w-full py-2 rounded-md bg-[#341F97] text-white font-semibold hover:bg-[#2a177a] transition"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Camera, X } from "lucide-react";

// export default function ProfileForm() {
//   const defaultImage = "/icons/user.png";
//   const [name, setName] = useState("Jason Doe");
//   const [email, setEmail] = useState("jason@gmail.com");
//   const [image, setImage] = useState(defaultImage);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImage(url);
//     }
//   };

//   const handleRemoveImage = () => {
//     setImage(defaultImage);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ name, email, image });
//   };

//   const isDefaultImage = image === defaultImage;

//   return (
//     <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white text-[#333] px-4">
//       <div className="bg-white border border-[#ddd] w-full max-w-md p-6 rounded-xl shadow-lg">
//         <h2 className="text-center text-xl font-semibold text-[#341F97] mb-1">Profile</h2>
//         <p className="text-center text-gray-500 text-sm mb-6">Your profile information</p>

//         {/* Avatar */}
//         <div className="relative w-28 h-28 mx-auto mb-2">
//           <Image
//             src={image}
//             alt="Profile"
//             width={112}
//             height={112}
//             className="rounded-full object-cover border-4 border-[#eee]"
//           />
//           <label className="absolute bottom-0 right-0 bg-[#341F97] text-white p-1 rounded-full cursor-pointer shadow">
//             <Camera size={16} />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </label>
//         </div>

//         {!isDefaultImage && (
//           <div className="text-center mb-6">
//             <button
//               onClick={handleRemoveImage}
//               className="flex items-center justify-center gap-1 text-sm text-red-500 hover:underline"
//             >
//               <X size={14} />
//               Remove image
//             </button>
//           </div>
//         )}

//         {/* Full Name */}
//         <div className="mb-4">
//           <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full bg-[#f9f9f9] text-black p-2 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#341F97]"
//           />
//         </div>

//         {/* Email Address */}
//         <div className="mb-6">
//           <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full bg-[#f9f9f9] text-black p-2 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#341F97]"
//           />
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="w-full py-2 rounded-md bg-[#341F97] text-white font-semibold hover:bg-[#2a177a] transition"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";

export default function ProfileForm() {
  const defaultImage = "/icons/user.png";
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(defaultImage);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isDefaultImage = image === defaultImage;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const user = data.data;
        console.log(user)
        setName(user.name || "");
        setEmail(user.email || "");
        setAbout(user.about || "");
        setImage(user.profile_picture || defaultImage);
        setPhone(user.phone || "")
      } catch (err) {
        console.error("❌ Error fetching user data", err);
      }
    };

    if (userId && token) fetchUser();
  }, [userId, token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(defaultImage);
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = image;

      // لو في صورة جديدة اختارها المستخدم
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudData = await cloudRes.json();
        imageUrl = cloudData.secure_url;
      }

      const updateRes = await fetch("http://localhost:5000/api/v1/user/update-Profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, about, profile_picture: imageUrl }),
      });

      if (!updateRes.ok) throw new Error("Failed to update profile");

      alert("✅ تم تحديث البروفايل بنجاح");
      window.location.reload();
    } catch (err) {
      console.error("❌ Error updating profile", err);
      alert("❌ فشل في تحديث البيانات");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white text-[#333] px-4">
      <div className="bg-white border border-[#ddd] w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-center text-xl font-semibold text-[#341F97] mb-1">Profile</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Your profile information</p>

        {/* Avatar */}
        <div className="relative w-28 h-28 mx-auto mb-2">
          <Image
            src={image}
            alt="Profile"
            width={112}
            height={112}
            className="rounded-full object-cover border-4 border-[#eee]"
          />
          <label className="absolute bottom-0 right-0 bg-[#341F97] text-white p-1 rounded-full cursor-pointer shadow">
            <Camera size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {!isDefaultImage && (
          <div className="text-center mb-6">
            <button
              onClick={handleRemoveImage}
              className="flex items-center justify-center gap-1 text-sm text-red-500 hover:underline"
            >
              <X size={14} />
              Remove image
            </button>
          </div>
        )}

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#f9f9f9] text-black p-2 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#341F97]"
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
          <input
            disabled
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#f9f9f9] text-black p-2 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#341F97]"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Phone Number</label>
          <input
            disabled
            type="text"
            value={phone}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#f9f9f9] text-black p-2 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#341F97]"
          />
        </div>

        {/* About */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-1 block">About</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={3}
            className="w-full bg-[#f9f9f9] text-black p-2 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#341F97]"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-2 rounded-md bg-[#341F97] text-white font-semibold hover:bg-[#2a177a] transition"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
