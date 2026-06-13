import { useEffect, useState } from "react";
import item from "../../blogs.json";

export default function Blogs({ token }) {
  return (
    <div className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">Blogs</h1>
        <p className="text-gray-600 mb-6">
          Bienvenido a nuestra sección de blogs. Aquí encontrarás artículos,
          historias y actualizaciones sobre nuestra causa, el impacto de tus
          donaciones y cómo estamos trabajando para hacer una diferencia.
        </p>
      </div>
      <div>
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {item.map((blog) => (
            <div key={blog.id} className="border rounded-lg overflow-hidden shadow-sm">
                <img src={blog.imagen} alt={blog.noticia} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{blog.noticia}</h2>
                    <p className="text-gray-600 text-sm mb-4">{blog.fecha}</p>
                    <p className="text-gray-700">{blog.descripcion}</p>
                    <p className="text-blue-600 hover:underline">
                        <a href={blog.link} target="_blank" rel="noopener noreferrer">
                            Leer más
                        </a>
                    </p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
