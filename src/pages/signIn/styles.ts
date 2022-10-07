import { IonButton } from "@ionic/react";
import styled from "styled-components";

export const StyledContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Logo = styled("div")`
  width: 200px;
  height: 200px;
  background-color: var(--ion-color-secondary);
  margin-bottom: 3rem;
`;

export const SignInButton = styled(IonButton)`
  margin-top: 1.6rem;
`;

export const SignUpButton = styled(IonButton)`
  margin-top: 0.8rem;
`;
