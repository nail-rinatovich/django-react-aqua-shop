import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../api/products";

export default function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "";
  const search = params.get("search") ?? "";
  const page = Number(params.get("page") ?? 1);
  const [searchInput, setSearchInput] = useState(search);

  const productsQuery = useQuery({
    queryKey: ["products", { category, search, page }],
    queryFn: () =>
      fetchProducts({
        category: category || undefined,
        search: search || undefined,
        page,
      }),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    setParams(next);
  };

  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-6">
      <aside>
        <h2 className="font-semibold mb-3">Категории</h2>
        <ul className="space-y-1 text-sm">
          <li>
            <button
              onClick={() => updateParam("category", "")}
              className={!category ? "text-blue-600 font-medium" : "hover:text-blue-600"}
            >
              Все
            </button>
          </li>
          {categoriesQuery.data?.results.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => updateParam("category", c.slug)}
                className={
                  category === c.slug
                    ? "text-blue-600 font-medium"
                    : "hover:text-blue-600"
                }
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateParam("search", searchInput);
          }}
          className="mb-4"
        >
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Поиск товара…"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {productsQuery.isLoading && <div>Загрузка…</div>}
        {productsQuery.isError && <div className="text-red-600">Ошибка загрузки</div>}

        {productsQuery.data && productsQuery.data.results.length === 0 && (
          <div className="text-gray-500">Ничего не найдено</div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productsQuery.data?.results.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.slug}`}
              className="border rounded-xl p-3 hover:shadow-md transition bg-white flex flex-col"
            >
              <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                {p.main_image ? (
                  <img
                    src={p.main_image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-gray-300 text-sm">Нет фото</span>
                )}
              </div>
              <div className="font-medium mt-3 line-clamp-2">{p.name}</div>
              {p.volume && (
                <div className="text-xs text-gray-500">{p.volume}</div>
              )}
              <div className="mt-auto pt-2 flex items-baseline gap-2">
                <span className="font-bold">{p.price} ₽</span>
                {p.old_price && (
                  <span className="text-sm text-gray-400 line-through">
                    {p.old_price} ₽
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <Pagination
          page={page}
          hasNext={!!productsQuery.data?.next}
          hasPrev={!!productsQuery.data?.previous}
          onChange={(p) => updateParam("page", String(p))}
        />
      </section>
    </div>
  );
}

function Pagination({
  page,
  hasNext,
  hasPrev,
  onChange,
}: {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  onChange: (page: number) => void;
}) {
  if (!hasNext && !hasPrev) return null;
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        disabled={!hasPrev}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        ← Назад
      </button>
      <span className="px-3 py-1">Стр. {page}</span>
      <button
        disabled={!hasNext}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Вперёд →
      </button>
    </div>
  );
}