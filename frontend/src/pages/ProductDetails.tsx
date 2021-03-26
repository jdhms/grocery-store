import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import styled from "styled-components";
import {
  DetailsList,
  SelectionMode,
  ActionButton,
  IColumn,
  Persona,
  PersonaSize,
  MessageBarType,
  ProgressIndicator,
} from "@fluentui/react";
import {
  OrderCommandBar,
  OrderProductModal,
  ErrorMessage,
  ConfirmDeleteOrderModal,
  Product,
} from "../components";
import { UserContext } from "../context";
import { useParams } from "react-router";

interface Order {
  id: string;
  count: number;
}

interface ProductDetails extends Product {
  orders: Order[];
}

interface RouteParams {
  productId: string;
}

export const ProductPage: React.FC = () => {
  const { productId } = useParams<RouteParams>();
  const { request } = useContext(UserContext);
  const [product, setProduct] = useState<ProductDetails>();
  const [deletingOrder, setDeletingOrder] = useState<Order>();
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProduct = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const result = await request<ProductDetails>(`/product/${productId}`);
      setProduct(result ?? undefined);
    } catch (e) {
      setProduct(undefined);
      setError(e.message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [request, productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const columns: IColumn[] = useMemo(
    () => [
      {
        key: "id",
        name: "ID",
        fieldName: "id",
        minWidth: 100,
      },
      {
        key: "count",
        name: "Count",
        fieldName: "count",
        minWidth: 100,
      },
      {
        key: "createdBy",
        name: "Created By",
        fieldName: "createdBy",
        minWidth: 200,
      },
      {
        key: "actions",
        name: "Actions",
        minWidth: 200,
        onRender: (item: Order) => (
          <StyledActionButton
            iconProps={{ iconName: "RecycleBin" }}
            onClick={(e) => setDeletingOrder(item)}
          >
            Delete
          </StyledActionButton>
        ),
      },
    ],
    []
  );

  const onDeleted = (productId: string, orderId: string) => {
    setProduct((p) =>
      p
        ? {
            ...p,
            orders: p.orders.filter((o) => o.id !== orderId),
          }
        : undefined
    );
    setDeletingOrder(undefined);
  };

  const onOrderComplete = (product: ProductDetails) => {
    setProduct((p) =>
      p
        ? {
            ...p,
            ...product,
          }
        : undefined
    );
    setCreatingOrder(false);
  };

  return (
    <>
      <OrderCommandBar onCreateOrder={() => setCreatingOrder(true)} />
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
      <Wrapper>
        {product && (
          <Persona
            size={PersonaSize.size72}
            text={product.name}
            imageInitials={product.name.slice(0, 2)}
            secondaryText={product.category}
            tertiaryText={product.createdBy}
          />
        )}
        <StyledDetailsList
          columns={columns}
          items={product?.orders ?? []}
          selectionMode={SelectionMode.none}
        />
        {deletingOrder && product && (
          <ConfirmDeleteOrderModal
            productId={product.id}
            orderId={deletingOrder.id}
            onDeleted={onDeleted}
            onCancel={() => setDeletingOrder(undefined)}
          />
        )}
        {creatingOrder && product && (
          <OrderProductModal
            {...product}
            onCancel={() => setCreatingOrder(false)}
            onComplete={onOrderComplete}
          />
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-color: var(--background-paper);
  padding: 2rem;
  margin: 2rem;
`;

const StyledActionButton = styled(ActionButton)`
  display: inline-block;
  height: 16px;
`;

const StyledDetailsList = styled(DetailsList)`
  margin-top: 2rem;
`;

const LoadingBar = styled(ProgressIndicator)`
  margin-bottom: -2px;

  .ms-ProgressIndicator-itemProgress {
    padding: 0;
  }
`;
