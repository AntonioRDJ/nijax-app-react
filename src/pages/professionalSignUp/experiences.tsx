import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonText, IonTextarea } from "@ionic/react";
import { close } from "ionicons/icons";
import { Experience } from "../../services/user/types";
import { ExperienceBox } from "./styles";

type ExperiencesProps = {
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  readonly?: boolean;
};

export const Experiences = (props: ExperiencesProps) => {
  const { experiences, setExperiences, readonly } = props;
  const createNewExperience = () => {
    setExperiences(formation => [...formation, {
      id: (new Date().getTime()).toString(),
      title: "",
      description: "",
    }]);
  };

  const updateExperience = (toUpdate: Experience) => {
    setExperiences(ex => ex.map(obj => {
      if(toUpdate.id === obj.id) {
        return toUpdate;
      }
      return obj;
    }));
  }

  const removeExperience = (toRemove: Experience) => {
    setExperiences(ex => ex.filter(e => e.id !== toRemove.id));
  }

  return (
    <>
      <IonText>
        <h4>Experiências</h4>
      </IonText>
      <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
        {experiences.map(ex => (
          <ExperienceComponent
            key={ex.id}
            title={ex.title}
            onChange={(value) => updateExperience({...ex, title: value.title, description: value.description})}
            onClose={() => removeExperience(ex)}
            description={ex.description}
            readonly={readonly}
          />
        ))}
      </div>
      {!readonly && (
        <IonButton onClick={createNewExperience} style={{marginTop: "8px"}}>Adicionar Experiência</IonButton>
      )}
    </>
  );
};

type ExperienceProps = {
  title: string;
  description: string;
  onChange?: ({title, description}: {title: string, description: string}) => void;
  onClose?: () => void;
  readonly?: boolean;
};

export const ExperienceComponent = (props: ExperienceProps) => {
  const { title, description, onChange, onClose , readonly} = props;
  return (
    <ExperienceBox>
      <IonItem>
        <IonLabel position="floating">Título</IonLabel>
        <IonInput
          type="text"
          value={title}
          onIonChange={(e) => onChange && onChange({title: e.detail.value!, description})}
          readonly={readonly}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Descrição</IonLabel>
        <IonTextarea
          value={description}
          onIonChange={(e) => onChange && onChange({description: e.detail.value!, title})}
          readonly={readonly}
        ></IonTextarea>
      </IonItem>
      {!readonly && (
        <IonButton fill="clear" shape="round" size="small" style={{position: "absolute", right: "0", top: "0", zIndex: "1"}} onClick={onClose}>
          <IonIcon slot="icon-only" icon={close}></IonIcon>
        </IonButton>
      )}
    </ExperienceBox>
  );
};