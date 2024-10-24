import {CurrentUser} from 'sanity'
import {UserExtended} from 'sanity-plugin-utils'

const sendGridMailer = {
  sendEmail: ({
    url,
    method,
    body,
  }: {
    url: string
    method: string
    body: any
  }): Promise<void> => {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to send email')
        }
      })
      .catch((innerError) => {
        console.error(innerError)
      })
  },
  sendWorkflowCreatedEmail: ({
    currentUser,
    documentTitle,
  }: {
    currentUser: CurrentUser | null
    documentTitle: string | undefined
  }): void => {
    if (currentUser) {
      // fetch('/api/email/workflow/created', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({email: currentUser.email}),
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error('Failed to send email')
      //     }
      //   })
      //   .catch((innerError) => {
      //     console.error(innerError)
      //   })
      sendGridMailer.sendEmail({
        url: '/api/email/workflow/created',
        method: 'POST',
        body: {email: currentUser.email, documentTitle},
      })
    }
  },
  sendUserAssignedEmail: ({
    name,
    email,
    documentId,
  }: {
    name: string
    email: string
    documentId: string
  }): void => {
    // fetch('/api/email/workflow/assigned', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({name, email, documentId}),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Failed to send email')
    //     }
    //   })
    //   .catch((innerError) => {
    //     console.error(innerError)
    //   })
    sendGridMailer.sendEmail({
      url: '/api/email/workflow/assigned',
      method: 'POST',
      body: {name, email, documentId},
    })
  },
  sendWorkflowUpdatedEmail: ({
    assigneesMeta,
    state,
    documentId,
  }: {
    assigneesMeta: (UserExtended | undefined)[]
    state: string
    documentId: string
  }): void => {
    // fetch('/api/email/workflow/updated', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({assigneesMeta, state}),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Failed to send email')
    //     }
    //   })
    //   .catch((innerError) => {
    //     console.error(innerError)
    //   })
    sendGridMailer.sendEmail({
      url: '/api/email/workflow/updated',
      method: 'POST',
      body: {assigneesList: assigneesMeta, state, documentId},
    })
  },
}

export default sendGridMailer
