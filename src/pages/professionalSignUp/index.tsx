import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { ExperienceBox } from "./styles";

export const ProfessionalSignUp = () => {

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/signup" />
          </IonButtons>
          <IonTitle>Cadastro Profissional</IonTitle>
        </IonToolbar>
      </IonHeader>
    
      <IonContent fullscreen>
        <IonList style={{padding: "0 8px", overflow: "hidden"}}>
          <IonItem>
            <IonLabel position="floating">Nome Fantasia</IonLabel>
            <IonInput type="text"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Endereço</IonLabel>
            <IonInput type="text"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Serviço prestado</IonLabel>
            <IonSelect placeholder="Selecione">
              <IonSelectOption value="apples">Apples</IonSelectOption>
              <IonSelectOption value="oranges">Oranges</IonSelectOption>
              <IonSelectOption value="bananas">Bananas</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonText>
            <h4>Experiências</h4>
          </IonText>
          <Experience title="oi" description="teste"/>
          <IonButton>Adicionar Experiência</IonButton>
          
          <IonText>
            <h4>Formações</h4>
          </IonText>
          <Formation name="" location="" startDate={new Date()} endDate={new Date()}/>
          <IonButton>Adicionar Formação</IonButton>

          <IonText>
            <h4>Redes Sociais</h4>
          </IonText>
          <SocialMedia />
          <IonButton>Adicionar Rede Social</IonButton>
        </IonList>
      </IonContent>

      <IonFooter collapse="fade">
        <IonToolbar>
          <IonButtons>
            <IonButton shape="round">Confirmar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

type ExperienceProps = {
  title: string;
  onChangeTitle?: (value: string) => void;
  description: string;
  onChangeDescription?: (value: string) => void;
};

export const Experience = (props: ExperienceProps) => {

  return (
    <ExperienceBox>
      <IonItem>
        <IonLabel position="floating">Titulo</IonLabel>
        <IonInput type="text"></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Descrição</IonLabel>
        <IonTextarea></IonTextarea>
      </IonItem>
    </ExperienceBox>
  );
};

type FormationProps = {
  name: string;
  onChangeName?: (value: string) => void;
  startDate: Date;
  onChangeStartDate?: (value: Date) => void;
  endDate?: Date;
  onChangeEndDate?: (value: Date) => void;
  location: string;
  onChangeLocation?: (value: string) => void;
};

export const Formation = (props: FormationProps) => {

  return (
    <ExperienceBox>
      <IonItem>
        <IonLabel position="floating">Nome</IonLabel>
        <IonInput type="text"></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Data de início</IonLabel>
        <IonInput type="date"></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Data de término</IonLabel>
        <IonInput type="date"></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Lugar</IonLabel>
        <IonInput type="text"></IonInput>
      </IonItem>
    </ExperienceBox>
  );
};

const SocialMedia = () => {

  return (
    <ExperienceBox>
      <IonItem>
        <IonLabel position="floating">Rede Social</IonLabel>
        <IonSelect placeholder="Selecione">
          <IonSelectOption value="apples">Facebook</IonSelectOption>
          <IonSelectOption value="oranges">Instagram</IonSelectOption>
          <IonSelectOption value="bananas">Linkedin</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel>Url</IonLabel>
        <IonInput type="text"></IonInput>
      </IonItem>
    </ExperienceBox>
  );
};