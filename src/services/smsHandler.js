// export const setupSMSListener = () => {
//     if ('sms' in navigator) {
//       navigator.sms.receive().then(message => {
//         const codeMatch = message.match(/Код для входу: (\w+)/)
//         if (codeMatch) {
//           const extractedCode = codeMatch[1]
          
//           // Find CodeInput component and set code
//           const codeInputComponent = document.querySelector('code-input')
//           if (codeInputComponent) {
//             codeInputComponent.setCodeFromSMS(extractedCode)
//           }
//         }
//       }).catch(error => {
//         console.error('SMS receive error:', error)
//       })
//     } else {
//       console.warn('SMS receiving not supported')
//     }
//   }

//   export const setupSMSListener = () => {
//     // Web API для SMS (experimental)
//     console.log( navigator )
//     if ('sms' in navigator) {
//       navigator.sms.receive().then(message => {
//         const codeMatch = message.content.match(/Код для входу: (\w+)/i)
//         if (codeMatch) {
//           const smsCode = codeMatch[1]
          
//           // Знаходимо компонент CodeInput та встановлюємо код
//           const codeInputComponent = document.querySelector('input[placeholder="Введіть код"]')
//           console.log( codeInputComponent )
//           if (codeInputComponent?.__vue_app__) {
//             codeInputComponent.__vue_app__.setCodeFromSMS(smsCode)
//           }
//         }
//       }).catch(error => {
//         console.error('Помилка отримання SMS:', error)
//       })
//     } else {
//       console.warn('SMS API не підтримується')
//     }
//   }

  // Альтернативні методи отримання SMS
// export const setupSMSFallbackListener = () => {
//     // Clipboard API
//     navigator.clipboard.readText().then(clipText => {
//         console.log( clipText )
//       const codeMatch = clipText.match(/Код для входу: (\w+)/)
//       if (codeMatch) {
//         const extractedCode = codeMatch[1]
//         document.dispatchEvent(
//           new CustomEvent('sms-code-received', { 
//             detail: { code: extractedCode } 
//           })
//         )
//       }
//     })
  
//     // Cordova/Capacitor Plugin (для мобільних)
//     if (window.cordova && window.cordova.plugins.sms) {
//       window.cordova.plugins.sms.receiveSMS(
//         message => {
//           const codeMatch = message.match(/Код для входу: (\w+)/)
//           if (codeMatch) {
//             const extractedCode = codeMatch[1]
//             document.dispatchEvent(
//               new CustomEvent('sms-code-received', { 
//                 detail: { code: extractedCode } 
//               })
//             )
//           }
//         },
//         error => console.error('SMS receive error', error)
//       )
//     }
//   }
  
//   // Listener у компоненті
//   export const setupCodeListener = (callback) => {
//     document.addEventListener('sms-code-received', (event) => {
//       callback(event.detail.code)
//     })
//   }


  export const setupSMSFallbackListener = () => {
    // Перехоплення нової СМС при надходженні
    const interceptSMS = async () => {
      try {
        // Отримання останнього SMS
        const smsText = await navigator.clipboard.readText()
        const codeMatch = smsText.match(/Код для входу: (\w+)/)
        
        if (codeMatch) {
          const extractedCode = codeMatch[1]
          
          // Створення кастомної події
          const event = new CustomEvent('new-sms-code', {
            detail: { code: extractedCode }
          })
          
          // Диспетчеризація події
          document.dispatchEvent(event)
        }
      } catch (error) {
        console.error('SMS intercept error:', error)
      }
    }
  
    // Періодична перевірка буферу обміну
    const intervalId = setInterval(interceptSMS, 1000)
  
    // Очищення інтервалу
    return () => clearInterval(intervalId)
  }
  
  export const setupCodeListener = (callback) => {
    document.addEventListener('new-sms-code', (event) => {
      callback(event.detail.code)
    })
  }