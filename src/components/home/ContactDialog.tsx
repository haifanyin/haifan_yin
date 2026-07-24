'use client'

import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { professorInfo } from '@/lib/data'
export default function ContactDialog() {
  const [copied, setCopied] = useState(false)
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(professorInfo.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-accent group w-full text-left">
          <Mail className="w-4 h-4 flex-shrink-0 text-primary/50 group-hover:text-primary/70" />
          <span className="truncate">{professorInfo.email}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary/60" />
            Contact
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Email</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono">{professorInfo.email}</p>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                  title="Copy email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Address</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {professorInfo.address}
              </p>
            </div>
          </div>
          <a
            href={`mailto:${professorInfo.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
