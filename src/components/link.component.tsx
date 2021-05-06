import { Link as LinkMUI, LinkTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import React, { ReactElement, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

type LinkProps = Omit<
  // eslint-disable-next-line @typescript-eslint/ban-types
  OverridableComponent<LinkTypeMap>,
  "component"
> & { to: string; children: ReactNode };

function Link(props: LinkProps): ReactElement {
  const { to, children, ...materialLinkProps } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LinkMUI {...materialLinkProps} component={RouterLink} to={to}>
      {children}
    </LinkMUI>
  );
}

export default Link;
