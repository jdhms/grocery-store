import React, { useEffect, useContext, useState, useCallback } from "react";
import styled from "styled-components";
import {
  ActionButton,
  MessageBarType,
  ProgressIndicator,
} from "@fluentui/react";
import { UserContext } from "../context";
import { ProductCard, Product } from "./ProductCard";
import { ConfirmDeleteProductModal } from "./ConfirmDeleteModal";
import { OrderProductModal } from "./OrderProductModal";
import { CreateProductModal } from "./CreateProductModal";
import { ProductCommandBar } from "./ProductCommandBar";
import { ErrorMessage } from "./ErrorMessage";
import { useParams } from "react-router";

const PAGE_SIZE = 16;

interface RouteParams {
  category?: string;
}

export const ProductList: React.FC = (props) => {
  const { category } = useParams<RouteParams>();
  const { request } = useContext(UserContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [orderingProduct, setOrderingProduct] = useState<Product | null>(null);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const cat = category ?? "";
      const products = await request<Product[]>(
        `/product?page=${page}&category=${cat}`
      );
      setProducts(products ?? []);
    } catch (e) {
      setProducts([]);
      setError(e.message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [request, category, page]);

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
      {error && (
        <ErrorMessage
          messageBarType={MessageBarType.error}
          isMultiline={false}
          onDismiss={() => setError("")}
        >
          Error retrieving products: {error}
        </ErrorMessage>
      )}
      {loading && <LoadingBar />}
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
      <PageWrapper>
        <PrevPageButton
          iconProps={{ iconName: "Back" }}
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
        >
          Previous
        </PrevPageButton>
        <NextPageButton
          iconProps={{ iconName: "Forward" }}
          onClick={() => setPage((p) => p + 1)}
          disabled={products.length < PAGE_SIZE}
        >
          Next
        </NextPageButton>
      </PageWrapper>
      {deletingProduct && (
        <ConfirmDeleteProductModal
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
  flex: 1;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem;
`;

const PrevPageButton = styled(ActionButton)`
  margin-left: 1rem;

  .ms-Button-flexContainer i {
    color: inherit;
  }
`;

const NextPageButton = styled(PrevPageButton)`
  .ms-Button-flexContainer {
    flex-flow: row-reverse nowrap;
  }
`;

const LoadingBar = styled(ProgressIndicator)`
  margin-bottom: -2px;

  .ms-ProgressIndicator-itemProgress {
    padding: 0;
  }
`;
