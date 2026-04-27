import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

const INITIAL_FORM = { title: '', body: '', imageUrl: '' }

const usePostForm = ({ addPost, onClose, open }) => {
  const [form, setForm]       = useState(INITIAL_FORM)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  // Modal hər açılanda formu sıfırla
  useEffect(() => {
    if (open) {
      setForm(INITIAL_FORM)
      setErrors({})
    }
  }, [open])

  const validate = useCallback(() => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.body.trim())  errs.body  = 'Content is required'
    return errs
  }, [form])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev)   => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }, [])

  const reset = useCallback(() => {
    setForm(INITIAL_FORM)
    setErrors({})
  }, [])

  const handleClose = useCallback(() => {
    if (loading) return
    reset()
    onClose()
  }, [loading, reset, onClose])

  const handleSubmit = useCallback(async () => {
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setLoading(true)
    try {
      await addPost({
        title:    form.title.trim(),
        body:     form.body.trim(),
        imageUrl: form.imageUrl.trim() || undefined,
        userId:   1,
      })
      reset()
      onClose()
    } catch {
      toast.error('Failed to create post')
    } finally {
      setLoading(false)
    }
  }, [addPost, form, validate, reset, onClose])

  return { form, errors, loading, handleChange, handleSubmit, handleClose }
}

export default usePostForm
