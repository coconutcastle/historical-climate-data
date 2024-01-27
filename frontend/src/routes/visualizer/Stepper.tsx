
export interface Step {
  title: string,
  description: string,
  nextStep: number,
  prevStep: number
}

interface StepperProps {
  steps: Step[];
  currStep: Step;
  setCurrStep: (step: Step) => void;
}

export const Stepper = ({ steps, currStep, setCurrStep }: StepperProps) => {

  return (
    <div className="stepper-wrapper">
      {/* <hr style={{ width: "100%" }} /> */}
      <div className="stepper">
        <button className="transparent-button" disabled={currStep.prevStep === -1}
        onClick={() => setCurrStep(steps[currStep.prevStep])}>
          {currStep.prevStep !== -1 && (
            <>
              <i className="material-icons">
                arrow_back
              </i>
              <div className="button-text">{currStep.prevStep !== -1 ? steps[currStep.prevStep].title : 'none'}</div>
            </>
          )}
        </button>
        <div className="stepper-title">{currStep.title}</div>
        <button className="transparent-button" disabled={currStep.nextStep === -1}
        onClick={() => setCurrStep(steps[currStep.nextStep])}>
          {currStep.nextStep !== -1 && (
            <>
              <div className="button-text">{currStep.nextStep !== -1 ? steps[currStep.nextStep].title : 'none'}</div>
              <i className="material-icons">
                arrow_forward
              </i>
            </>
          )}
        </button>
      </div>
    </div>
  )
}