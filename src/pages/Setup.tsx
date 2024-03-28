import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from "@chakra-ui/react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { Password } from "./Password"
import { useState } from "react"
import { Mnemonic } from "./Mnemonic"
import { Congratz } from "./Congratz"

export const Setup = () => {
    const [mnemonic,setMnemonic] = useState('')
    const [password,setPassword] = useState('')
    const steps = [
        { title: 'First', description: 'Password' },
        { title: 'Second', description: 'Save Phrase' },
        { title: 'Third', description: 'Complete' },
      ]
      
      
    const { activeStep, goToNext } = useSteps({
          index: 1,
          count: steps.length,
    })
      
        return (
        <Card className="min-w-[400px]">
            <CardHeader>
            <Stepper index={activeStep}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
      
                <Box flexShrink='0'>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
            </Stepper>
            </CardHeader>
            <CardBody>
                {activeStep === 1 && <Password setMnemonic={setMnemonic} setPassword={setPassword} goNext={goToNext}/>}
                {activeStep ===2 && <Mnemonic mnemonic={mnemonic} password={password} goNext={goToNext}/>}
                {activeStep ===3 && <Congratz/>}
            </CardBody>
        </Card>
          
        )
}