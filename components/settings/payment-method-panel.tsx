"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CreditCard, AlertCircle, Trash2 } from "lucide-react"

interface PaymentMethodPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "add" | "edit"
  currentMethod?: PaymentMethod
  onSave: (method: PaymentMethod) => void
  onDelete?: () => void
}

export interface PaymentMethod {
  id: string
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cardholderName: string
  isDefault: boolean
}

export function PaymentMethodPanel({
  open,
  onOpenChange,
  mode,
  currentMethod,
  onSave,
  onDelete,
}: PaymentMethodPanelProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  // Form state
  const [cardNumber, setCardNumber] = useState(currentMethod?.cardNumber || "")
  const [expiryMonth, setExpiryMonth] = useState(currentMethod?.expiryMonth || "")
  const [expiryYear, setExpiryYear] = useState(currentMethod?.expiryYear || "")
  const [cardholderName, setCardholderName] = useState(currentMethod?.cardholderName || "")
  const [isDefault, setIsDefault] = useState(true)

  const handleSave = () => {
    setIsLoading(true)
    setError(null)

    // Basic validation
    if (!cardNumber || !expiryMonth || !expiryYear || !cardholderName) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    // In a real app, you would send this data to your backend
    // For this demo, we'll just simulate a successful save
    setTimeout(() => {
      const method: PaymentMethod = {
        id: currentMethod?.id || `card-${Date.now()}`,
        cardNumber,
        expiryMonth,
        expiryYear,
        cardholderName,
        isDefault,
      }

      onSave(method)
      setIsLoading(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleDelete = () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true)
      return
    }

    setIsLoading(true)
    // In a real app, you would send a delete request to your backend
    // For this demo, we'll just simulate a successful delete
    setTimeout(() => {
      if (onDelete) onDelete()
      setIsLoading(false)
      setDeleteConfirm(false)
      onOpenChange(false)
    }, 1000)
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Generate years for expiry selection (current year + 20 years)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 21 }, (_, i) => (currentYear + i).toString())

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{mode === "add" ? "Add Payment Method" : "Edit Payment Method"}</SheetTitle>
          <SheetDescription>
            {mode === "add" ? "Add a new credit or debit card to your account." : "Update your payment method details."}
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="pl-10"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19} // 16 digits + 3 spaces
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryMonth">Expiry Month</Label>
                <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                  <SelectTrigger id="expiryMonth">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, "0")
                      return (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryYear">Expiry Year</Label>
                <Select value={expiryYear} onValueChange={setExpiryYear}>
                  <SelectTrigger id="expiryYear">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="isDefault"
                checked={true}
                disabled={true}
                onCheckedChange={(checked) => setIsDefault(checked as boolean)}
              />
              <Label htmlFor="isDefault" className="font-normal text-muted-foreground">
                Default payment method
              </Label>
            </div>
          </div>
        </div>

        <SheetFooter className="flex-col sm:flex-row gap-2">
          <div className="flex gap-2 w-full">
            <Button onClick={handleSave} disabled={isLoading} className="flex-1">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setDeleteConfirm(false)
                onOpenChange(false)
              }}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>

            {mode === "edit" && onDelete && (
              <Button variant="destructive" onClick={handleDelete} disabled={isLoading} className="flex-1">
                {deleteConfirm ? "Confirm Delete" : "Delete Card"}
                {!deleteConfirm && <Trash2 className="ml-2 h-4 w-4" />}
              </Button>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
