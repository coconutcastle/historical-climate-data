import { useState, useContext, useEffect } from 'react'
import UploadData from './UploadData';
import DisplayData from './DisplayData';
import Visualizer from './Visualizer';
import { DataContext } from '../../App';

interface Step {
  title: string,
  description: string,
  nextStep: number,
  prevStep: number
}

const steps: Step[] = [
  {
    title: 'Upload',
    description: 'Upload data to visualize.',
    nextStep: 1,
    prevStep: -1
  }, 
  {
    title: 'Confirm',
    description: 'Confirm that this is the desired data.',
    nextStep: 2,
    prevStep: 0
  },
  {
    title: 'Visualize',
    description: 'Visualize data.',
    nextStep: -1,
    prevStep: 1
  }
]

export default function VisualizerPage() {

  const { data, setData } = useContext(DataContext);
  const [currStep, setCurrStep] = useState<Step>(data === undefined ? steps[0] : steps[1]);

  // useEffect(() => {
  //   if (data !== undefined) {
  //     setCurrStep(steps[1]);
  //   }
  // }, [data])

  return (
    <div className="data-content"
      style={{ minHeight: '100vh' }} >
      <div className='title'>
        Historical Precipitation Data Explorer
      </div>
      <hr style={{ width: "100%" }} />
      {currStep.title === 'Upload' && <UploadData />}
      {currStep.title === 'Confirm' && <DisplayData />}
      {currStep.title === 'Visualize' && <Visualizer />}
    </div>
  )
}