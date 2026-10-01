import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/products";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProduct(slug!),
    enabled: !!slug,
  });

  if (isLoading) return <div>Загрузка…</div>;
  if (isError || !data) return <div className="text-red-600">Товар не найден</div>;

  return (
    <div>
      <Link to="/catalog" className="text-sm text-blue-600 hover:underline">
        ← Назад в каталог
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div>
          <div className="border rounded-xl p-4 flex items-center justify-center bg-gray-50 aspect-square">
            {data.main_image ? (
              <img
                src={data.main_image}
                alt={data.name}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-gray-300">Нет фото</span>
            )}
          </div>

          {data.images && data.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {data.images.map((img) => (
                <div
                  key={img.id}
                  className="border rounded-lg p-1 aspect-square flex items-center justify-center bg-white"
                >
                  <img
                    src={img.image}
                    alt={data.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="text-sm text-gray-500">{data.category.name}</div>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">{data.name}</h1>

          {data.volume && (
            <div className="text-gray-600 mt-1">Объём: {data.volume}</div>
          )}

          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-bold">{data.price} ₽</span>
            {data.old_price && (
              <span className="text-lg text-gray-400 line-through">
                {data.old_price} ₽
              </span>
            )}
          </div>

          <div className="mt-2 text-sm">
            {data.stock > 0 ? (
              <span className="text-green-600">В наличии: {data.stock} шт.</span>
            ) : (
              <span className="text-red-600">Нет в наличии</span>
            )}
          </div>

          {data.description && (
            <p className="mt-6 whitespace-pre-line text-gray-700">
              {data.description}
            </p>
          )}

          <button
            disabled={data.stock === 0}
            className="mt-6 w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-lg font-medium"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}