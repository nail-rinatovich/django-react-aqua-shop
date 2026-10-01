import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl md:text-5xl font-bold">
        Природная артезианская вода
      </h1>
      <p className="mt-4 text-gray-600 text-lg">
        Доставка по городу за 2 часа
      </p>
      <Link
        to="/catalog"
        className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
      >
        Перейти в каталог
      </Link>
    </section>
  );
}