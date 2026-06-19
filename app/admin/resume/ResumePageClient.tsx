'use client';

import { useState, useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';
import { setActiveResume, deleteResumeFile } from '@/actions';
import type { ResumeFile } from '@/types';
import { ResumeTable } from '@/components/admin/Tables';

export default function ResumePageClient({ files }: { files: ResumeFile[] }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File must be under 5MB.');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const fileName = `resume-${Date.now()}.pdf`;
      const storagePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(storagePath, file, { contentType: 'application/pdf', upsert: false });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(storagePath);

      // Deactivate existing active resumes
      await supabase.from('resume_files').update({ is_active: false }).eq('is_active', true);

      const { error: dbError } = await supabase.from('resume_files').insert({
        file_name: file.name,
        storage_path: storagePath,
        public_url: publicUrl,
        is_active: true,
      });

      if (dbError) throw dbError;

      setSuccess(true);
      setTimeout(() => window.location.reload(), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Resume</h1>
        <p className="text-sm text-secondary mt-1">Upload and manage your resume PDF.</p>
      </div>

      {/* Upload Area */}
      <div className="bg-surface border border-outline-variant rounded-lg p-6">
        <h2 className="text-sm font-semibold text-on-surface mb-4">Upload New Resume</h2>
        {error && <div className="mb-4 p-3 bg-error-container border border-error/30 rounded text-sm text-on-error-container">{error}</div>}
        {success && <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded text-sm text-emerald-700">Resume uploaded and set as active.</div>}

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg p-10 cursor-pointer hover:border-primary/40 hover:bg-surface-container-low transition-all">
          <svg className="w-10 h-10 text-secondary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          {uploading ? (
            <p className="text-sm font-semibold text-secondary">Uploading...</p>
          ) : (
            <>
              <p className="text-sm font-semibold text-on-surface mb-1">Drop PDF here or click to browse</p>
              <p className="text-xs text-secondary">PDF only, max 5MB</p>
            </>
          )}
          <input type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {/* Files list */}
      {files.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Uploaded Files</h2>
          <ResumeTable files={files} />
        </div>
      )}
    </div>
  );
}
