"use client"
import React, { useState, useEffect } from 'react'

const PasswordChecker: React.FC = () => {
  const [password, setPassword] = useState<string>('')
  const [strength, setStrength] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>('Introduce una contraseña para evaluarla.')
  const [improvement, setImprovement] = useState<string>('')
  const [examples, setExamples] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState<boolean>(false)

  useEffect(() => {
    const strength = calculatePasswordStrength(password)
    setStrength(strength)
    displayFeedback(strength)
    setImprovement(getImprovementMessage(password))
    generatePasswordExamples(password)
  }, [password])

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChars = /[\W_]/.test(password)
    const hasRepeatedChars = /(.).*\1.*\1.*\1/.test(password) || /(.)\1\1/.test(password)
    const hasSequentialChars = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/.test(password.toLowerCase())

    // Length check
    strength += Math.min(password.length * 4, 25)

    // Character type checks
    if (hasUpperCase) strength += 10
    if (hasLowerCase) strength += 10
    if (hasNumbers) strength += 10
    if (hasSpecialChars) strength += 15

    // Complexity checks
    if (password.length >= minLength) strength += 10
    if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) strength += 15

    // Penalize repeated characters
    if (hasRepeatedChars) strength -= 20

    // Penalize sequential characters
    if (hasSequentialChars) strength -= 15

    // Ensure strength is between 0 and 100
    return Math.max(0, Math.min(strength, 100))
  }

  const displayFeedback = (strength: number): void => {
    if (strength === 0) {
      setFeedback('Introduce una contraseña para evaluarla.')
    } else if (strength < 30) {
      setFeedback('Muy débil')
    } else if (strength < 50) {
      setFeedback('Débil')
    } else if (strength < 70) {
      setFeedback('Moderada')
    } else if (strength < 90) {
      setFeedback('Fuerte')
    } else {
      setFeedback('Muy fuerte')
    }
  }

  const getImprovementMessage = (password: string): string => {
    const missingRequirements: string[] = []
    if (password.length < 8) missingRequirements.push('al menos 8 caracteres')
    if (!/[A-Z]/.test(password)) missingRequirements.push('una letra mayúscula')
    if (!/[a-z]/.test(password)) missingRequirements.push('una letra minúscula')
    if (!/\d/.test(password)) missingRequirements.push('un número')
    if (!/[\W_]/.test(password)) missingRequirements.push('un símbolo')
    if (/(.).*\1.*\1.*\1/.test(password)) missingRequirements.push('evitar repetir un carácter 4 o más veces')
    if (/(.)\1\1/.test(password)) missingRequirements.push('evitar repetir un carácter 3 veces seguidas')
    if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/.test(password.toLowerCase())) {
      missingRequirements.push('evitar secuencias de caracteres')
    }

    if (missingRequirements.length === 0) {
      return '¡Esta contraseña es fuerte!'
    }
    return `Para mejorar, considera: ${missingRequirements.join(', ')}.`
  }

  const generatePasswordExamples = (password: string): void => {
    const examples: string[] = []
    let modifiedPassword = password

    // Ensure password length is at least 12 characters
    while (modifiedPassword.length < 12) {
      modifiedPassword += Math.random().toString(36).substr(2, 1)
    }

    // Ensure password contains uppercase, lowercase, number, and special character
    if (!/[A-Z]/.test(modifiedPassword)) modifiedPassword = 'A' + modifiedPassword.slice(1)
    if (!/[a-z]/.test(modifiedPassword)) modifiedPassword = modifiedPassword.slice(0, -1) + 'a'
    if (!/\d/.test(modifiedPassword)) modifiedPassword = modifiedPassword.slice(0, -1) + '1'
    if (!/[\W_]/.test(modifiedPassword)) modifiedPassword = modifiedPassword.slice(0, -1) + '!'

    // Remove repeated characters
    modifiedPassword = modifiedPassword.split('').filter((char, index, arr) => 
      arr.indexOf(char) === index || 
      (index > 0 && arr[index - 1] !== char) || 
      (index > 1 && arr[index - 2] !== char)
    ).join('')

    // Generate examples
    examples.push(`Ejemplo 1: ${modifiedPassword}`)
    examples.push(`Ejemplo 2: ${modifiedPassword.split('').sort(() => Math.random() - 0.5).join('')}`)
    examples.push(`Ejemplo 3: ${modifiedPassword.split('').reverse().join('')}`)

    setExamples(examples)
  }

  return (
    <div className="container">
      <div className="card">
        <div className="password-input-container">
          <label htmlFor="passwordInput" className="label-range">Ingresa tu contraseña:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="passwordInput"
              className="customInput password-input"
              placeholder="Escribe tu contraseña..."
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              ) : '👁️'}
            </button>
          </div>
        </div>

        <div className="password-strength-container">
          <label htmlFor="passwordStrength" className="label-range">Nivel de seguridad:</label>
          <input
            type="range"
            id="passwordStrength"
            min="0"
            max="100"
            value={strength}
            className="range-input"
            disabled
          />
          <p className={`password-feedback ${feedback.toLowerCase().replace(' ', '-')}`}>{feedback}</p>
        </div>

        <div className="password-improvement-container">
          <p className="password-improvement">{improvement}</p>
          <p className="password-examples">Ejemplos de contraseñas más seguras basadas en tu entrada:</p>
          <ul id="passwordExamplesList">
            {examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PasswordChecker