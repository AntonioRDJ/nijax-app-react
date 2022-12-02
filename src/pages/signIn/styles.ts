import { IonButton, IonThumbnail } from "@ionic/react";
import styled from "styled-components";

export const StyledContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const StyledIonThumbnail = styled(IonThumbnail)`
  --size: 250px;
  margin-bottom: 3rem;
`;

export const SignInButton = styled(IonButton)`
  margin-top: 1.6rem;
`;

export const SignUpButton = styled(IonButton)`
  margin-top: 0.8rem;
`;
