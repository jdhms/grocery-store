import React, { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../context";
import { Nav, INavLink } from "@fluentui/react";
import { UserInfo } from "./UserInfo";
import styled from "styled-components";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";

interface Category {
  name: string;
  count: string;
}

const Wrapper = styled.div`
  height: 100%;
  background-color: var(--background-paper);
  width: 300px;
`;

interface MatchParams {
  category?: string;
}

export const Sidebar: React.FunctionComponent = () => {
  const history = useHistory();
  const match = useRouteMatch<MatchParams>("/category/:category");
  const { request } = useContext(UserContext);
  const [categoryLinks, setCategoryLinks] = useState<INavLink[]>([]);

  const getCategories = useCallback(async () => {
    try {
      const categories = await request<Category[]>("/category");
      setCategoryLinks(
        (categories ?? []).map((c) => ({
          key: c.name,
          name: `(${c.count}) ${c.name}`,
          url: `/category/${c.name}`,
        }))
      );
    } catch (e) {
      setCategoryLinks([]);
      console.error(e);
    }
  }, [request]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Wrapper>
      <UserInfo />
      <Nav
        styles={{ root: { width: "100%" } }}
        groups={[
          {
            name: "Categories",
            expandAriaLabel: "Expand Utilities section",
            collapseAriaLabel: "Collapse Utilities section",
            links: categoryLinks,
          },
        ]}
        onLinkClick={(ev, el) => {
          ev?.preventDefault();
          el && history.push(el.url);
        }}
        selectedKey={match?.params?.category ?? ""}
      />
    </Wrapper>
  );
};
