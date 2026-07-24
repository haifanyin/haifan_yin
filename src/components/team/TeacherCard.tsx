'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, GraduationCap, Mail, School } from 'lucide-react'
import { staggerItem } from '@/lib/constants'
import type { Teacher } from '@/types'
export default function TeacherCard({ teacher }: { teacher: Teacher }) {

  return (
    <motion.div variants={staggerItem}>
      <Card className="overflow-hidden border-border/60 hover:shadow-lg transition-all duration-300 h-full student-card-accent student-card-teacher !py-3 !gap-3">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
            <div className="w-28 sm:w-48 aspect-[3/4] rounded-xl overflow-hidden border border-primary/10 flex-shrink-0">
              <Image
                src={teacher.avatar}
                alt={teacher.name}
                width={192}
                height={256}
                className="w-full h-full object-cover student-avatar-img"
              />
            </div>

            <div className="flex-1 min-w-0 w-full sm:w-auto text-center sm:text-left">
              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <h4 className="font-semibold text-sm">
                  {teacher.name}
                  <span className="text-muted-foreground font-normal ml-1.5">({teacher.nameCn})</span>
                </h4>
                <Badge className="text-[10px] px-2 py-0 border bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/15 dark:text-violet-400 dark:border-violet-800/25">
                  {teacher.title}
                </Badge>
                {teacher.subtitle && (
                  <Badge className={`text-[10px] px-2 py-0 border ${
                    teacher.subtitle === 'Ph.D. Supervisor'
                      ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/15 dark:text-red-400 dark:border-red-800/25'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25'
                  }`}>
                    {teacher.subtitle}
                  </Badge>
                )}
                {teacher.name === 'Haifan Yin' && (
                  <Badge className="text-[10px] px-2 py-0 border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800/25">
                    Master's Supervisor
                  </Badge>
                )}
              </div>

              {teacher.department && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-center sm:justify-start">
                  <School className="w-3 h-3 flex-shrink-0" />
                  {teacher.department}
                </p>
              )}

              {teacher.education && (
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 justify-center sm:justify-start">
                  <GraduationCap className="w-3 h-3 flex-shrink-0" />
                  {teacher.education}
                </p>
              )}

              {teacher.email && (
                <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                  <a
                    href={`mailto:${teacher.email}`}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    {teacher.email}
                  </a>
                </div>
              )}

              {teacher.researchAreas && teacher.researchAreas.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 justify-center sm:justify-start">
                  {teacher.researchAreas.map((area) => (
                    <Badge
                      key={area}
                      variant="secondary"
                      className="text-[10px] px-2 py-0 border bg-primary/5 text-primary/70 border-primary/10"
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              )}

              {/* View Profile link */}
              <div className="mt-3 pt-2 border-t border-border/30">
                {teacher.profileUrl ? (
                  <a
                    href={teacher.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-primary/70 hover:text-primary font-medium flex items-center gap-1 transition-colors"
                  >
                    <ArrowRight className="w-3 h-3" />
                    View Profile
                  </a>
                ) : (
                  <span className="text-[11px] text-primary/50 font-medium flex items-center gap-1 cursor-default">
                    <ArrowRight className="w-3 h-3" />
                    View Profile
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
