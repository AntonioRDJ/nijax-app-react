import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonText } from "@ionic/react";
import { close } from "ionicons/icons";
import { Formation } from "../../services/user/types";
import { ExperienceBox } from "./styles";

type FormationsProps = {
  formations: Formation[];
  setFormations: React.Dispatch<React.SetStateAction<Formation[]>>;
  readonly?: boolean;
};

export const Formations = (props: FormationsProps) => {
  const { formations, setFormations, readonly } = props;

  const createNewFormation = () => {
    setFormations(formation => [...formation,{
      id: (new Date().getTime()).toString(),
      course: "",
      startDate: "",
      endDate: "",
      institution: "",
    }]);
  };

  const updateFormation = (toUpdate: Formation) => {
    setFormations(formation => formation.map(obj => {
      if(toUpdate.id === obj.id) {
        return toUpdate;
      }
      return obj;
    }))
  }

  const removeFormation = (toRemove: Formation) => {
    setFormations(formation => formation.filter(f => f.id !== toRemove.id));
  }

  return (
    <>
      <IonText>
        <h4>Formações</h4>
      </IonText>
      <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
        {formations.map(formation => (
          <FormationComponent
            key={formation.id}
            course={formation.course}
            startDate={formation.startDate}
            endDate={formation.endDate}
            institution={formation.institution}
            onChange={(value) => updateFormation({...formation, course: value.course, startDate: value.startDate, endDate: value.endDate, institution: value.institution})}
            onClose={() => removeFormation(formation)}
            readonly={readonly}
          />
        ))}
      </div>

      {!readonly && (
        <IonButton onClick={createNewFormation} style={{marginTop: "8px"}}>Adicionar Formação</IonButton>
      )}
    </>
  );
};

type FormationProps = {
  course: string;
  startDate: Date | string;
  endDate?: Date | string;
  institution: string;
  onChange?: ({course, startDate, endDate, institution}: {course: string, startDate: Date | string, endDate?: Date | string, institution: string}) => void;
  onClose?: () => void;
  readonly?: boolean;
};

export const FormationComponent = (props: FormationProps) => {
  const { course, startDate, endDate, institution, onChange, onClose, readonly} = props;

  return (
    <ExperienceBox>
      <IonItem>
        <IonLabel position="floating">Curso</IonLabel>
        <IonInput
          type="text"
          value={course}
          onIonChange={(e) => onChange && onChange({course: e.detail.value!, startDate, endDate, institution})}
          readonly={readonly}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Data de início</IonLabel>
        <IonInput
          type="date"
          value={startDate.toString()}
          onIonChange={(e) => onChange && onChange({startDate: e.detail.value!, course, endDate, institution})}
          readonly={readonly}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel>Data de término</IonLabel>
        <IonInput
          type="date"
          value={endDate?.toString()}
          onIonChange={(e) => onChange && onChange({endDate: e.detail.value!, course, startDate, institution})}
          readonly={readonly}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Instituição</IonLabel>
        <IonInput
          type="text"
          value={institution}
          onIonChange={(e) => onChange && onChange({institution: e.detail.value!, course, startDate, endDate})}
          readonly={readonly}
        ></IonInput>
      </IonItem>
      {!readonly && (
        <IonButton fill="clear" shape="round" size="small" style={{position: "absolute", right: "0", top: "0", zIndex: "1"}} onClick={onClose}>
          <IonIcon slot="icon-only" icon={close}></IonIcon>
        </IonButton>
      )}
    </ExperienceBox>
  );
};