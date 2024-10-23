'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, CheckCircle, Lightbulb, RefreshCw } from 'lucide-react'

const exampleProblems = [
  {
    problem: "I'm struggling to manage my time effectively.",
    solutions: [
      "Create a daily schedule",
      "Use the Pomodoro technique",
      "Prioritize tasks with a to-do list"
    ],
    action: "Set up a simple daily planner for tomorrow"
  },
  {
    problem: "I'm having difficulty staying motivated at work.",
    solutions: [
      "Set small, achievable goals",
      "Find a work buddy for accountability",
      "Reward yourself for completing tasks"
    ],
    action: "Write down three work goals for this week"
  }
]

export default function ProblemSolvingTool() {
  const [showSplash, setShowSplash] = useState(true)
  const [step, setStep] = useState(1)
  const [problem, setProblem] = useState('')
  const [solutions, setSolutions] = useState(['', '', ''])
  const [chosenSolution, setChosenSolution] = useState('')
  const [actionStep, setActionStep] = useState('')
  const [progress, setProgress] = useState(25)

  useEffect(() => {
    const savedState = localStorage.getItem('problemSolvingState')
    if (savedState) {
      const { step, problem, solutions, chosenSolution, actionStep } = JSON.parse(savedState)
      setStep(step)
      setProblem(problem)
      setSolutions(solutions)
      setChosenSolution(chosenSolution)
      setActionStep(actionStep)
    }
  }, [])

  useEffect(() => {
    setProgress(step * 25)
    localStorage.setItem('problemSolvingState', JSON.stringify({ step, problem, solutions, chosenSolution, actionStep }))
  }, [step, problem, solutions, chosenSolution, actionStep])

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSolutionChange = (index: number, value: string) => {
    const newSolutions = [...solutions]
    newSolutions[index] = value
    setSolutions(newSolutions)
  }

  const handleChooseSolution = (solution: string) => {
    setChosenSolution(solution)
    handleNext()
  }

  const handleComplete = () => {
    alert('Great job! You\'ve completed the problem-solving process.')
    resetTool()
  }

  const resetTool = () => {
    setStep(1)
    setProblem('')
    setSolutions(['', '', ''])
    setChosenSolution('')
    setActionStep('')
    localStorage.removeItem('problemSolvingState')
  }

  const loadExample = () => {
    const example = exampleProblems[Math.floor(Math.random() * exampleProblems.length)]
    setProblem(example.problem)
    setSolutions(example.solutions)
    setActionStep(example.action)
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  if (showSplash) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-pink-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-8"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
        >
          Problem-Solving Tool
        </motion.h1>
        <motion.p 
          className="text-xl text-white mb-12 text-center"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 120 }}
        >
          Unlock your potential with structured problem-solving
        </motion.p>
        <motion.button
          className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold text-lg shadow-lg hover:bg-purple-100 transition duration-300"
          onClick={() => setShowSplash(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Problem-Solving Tool</CardTitle>
          <CardDescription className="text-center">Step {step} of 4</CardDescription>
          <Progress value={progress} className="w-full mt-2" />
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" {...fadeIn}>
                <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-2">
                  What's the problem you're facing?
                </label>
                <Textarea
                  id="problem"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Describe your problem here..."
                  className="w-full mb-4"
                />
                <Button onClick={loadExample} variant="outline" className="w-full">
                  <Lightbulb className="mr-2 h-4 w-4" /> Load Example Problem
                </Button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" {...fadeIn}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  List a few ideas to solve it:
                </label>
                {solutions.map((solution, index) => (
                  <Input
                    key={index}
                    value={solution}
                    onChange={(e) => handleSolutionChange(index, e.target.value)}
                    placeholder={`Solution ${index + 1}`}
                    className="mb-2"
                  />
                ))}
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" {...fadeIn}>
                <p className="text-sm font-medium text-gray-700 mb-2">Which idea seems the most helpful?</p>
                {solutions.filter(Boolean).map((solution, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChooseSolution(solution)}
                    className={`w-full mb-2 justify-start h-auto py-2 px-4 ${chosenSolution === solution ? 'bg-orange-100 border-orange-500' : ''}`}
                    variant="outline"
                  >
                    {solution}
                  </Button>
                ))}
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="step4" {...fadeIn}>
                <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-2">
                  What's the first step you can take?
                </label>
                <Input
                  id="action"
                  value={actionStep}
                  onChange={(e) => setActionStep(e.target.value)}
                  placeholder="Enter your first actionable step..."
                  className="w-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          {step > 1 && (
            <Button onClick={handleBack} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          )}
          {step < 4 ? (
            <Button onClick={handleNext} className="bg-pink-500 hover:bg-pink-600" disabled={
              (step === 1 && !problem) ||
              (step === 2 && !solutions.some(Boolean)) ||
              (step === 3 && !chosenSolution)
            }>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="bg-pink-500 hover:bg-pink-600" disabled={!actionStep}>
              Complete <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
        <div className="p-4 flex justify-center">
          <Button onClick={resetTool} variant="outline" className="text-gray-500">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset Tool
          </Button>
        </div>
      </Card>
    </div>
  )
}