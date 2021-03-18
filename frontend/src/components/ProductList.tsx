import React, { useEffect, useContext, useState, useCallback } from "react";
import styled from "styled-components";
import { UserContext } from "../context";
import { ProductCard, Product } from "./ProductCard";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { OrderProductModal } from "./OrderProductModal";
import { CreateProductModal } from "./CreateProductModal";
import { ProductCommandBar } from "./ProductCommandBar";

const Grid = styled.div`
  display: grid;
  padding: 2rem;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(min(350px, 100%), 1fr));
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-items: stretch;
  align-items: stretch;
`;

export const ProductList: React.FC = (props) => {
  const { request } = useContext(UserContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [orderingProduct, setOrderingProduct] = useState<Product | null>(null);
  const [creatingProduct, setCreatingProduct] = useState(false);

  const getProducts = useCallback(
    async (page = 0) => {
      try {
        const products = await request<Product[]>(`/product?page=${page}`);
        setProducts(products ?? []);
      } catch (e) {
        setProducts([]);
        console.error(e);
      }
    },
    [request]
  );

  const onProductDeleted = (id: string) => {
    setProducts((existing) => existing.filter((e) => e.id !== id));
    setDeletingProduct(null);
  };

  const onOrderCompleted = (product: Product | null) => {
    if (product) {
      setProducts((existing) =>
        existing.map((p) => (p.id === product.id ? product : p))
      );
    }
    setOrderingProduct(null);
  };

  const onProductCreated = (product: Product | null) => {
    if (product) {
      setProducts((existing) => [...existing, product]);
    }
    setCreatingProduct(false);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      <ProductCommandBar onCreateProduct={() => setCreatingProduct(true)} />
      <Grid>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            {...p}
            onDelete={() => setDeletingProduct(p)}
            onPlaceOrder={() => setOrderingProduct(p)}
          />
        ))}
      </Grid>
      {deletingProduct && (
        <ConfirmDeleteModal
          {...deletingProduct}
          onCancel={() => setDeletingProduct(null)}
          onDeleted={onProductDeleted}
        />
      )}
      {orderingProduct && (
        <OrderProductModal
          {...orderingProduct}
          onCancel={() => setOrderingProduct(null)}
          onComplete={onOrderCompleted}
        />
      )}
      {creatingProduct && (
        <CreateProductModal
          onCancel={() => setCreatingProduct(false)}
          onCreated={(p) => onProductCreated(p)}
        />
      )}
    </>
  );
};
