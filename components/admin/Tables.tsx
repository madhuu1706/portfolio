export function ExperiencesTable({ experiences }: { experiences: Experience[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">
              Role / Company
            </th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">
              Period
            </th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">
              Location
            </th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-outline-variant">
          {experiences.map((exp) => (
            <tr
              key={exp.id}
              className="hover:bg-surface-container-low transition-colors group"
            >
              <td className="py-4 px-4">
                <p className="text-sm font-semibold text-on-surface">
                  {exp.role}
                </p>
                <p className="text-xs text-secondary">{exp.company}</p>
              </td>

              <td className="py-4 px-4 text-sm text-secondary hidden md:table-cell">
                {formatDate(exp.start_date)} —{" "}
                {exp.is_current
                  ? "Present"
                  : exp.end_date
                    ? formatDate(exp.end_date)
                    : "—"}
              </td>

              <td className="py-4 px-4 text-sm text-secondary hidden md:table-cell">
                {exp.location || "—"}
              </td>

              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <a
                    href={`/admin/experiences/${exp.id}`}
                    className="p-1.5 text-secondary hover:text-primary rounded hover:bg-surface-container transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </a>

                  <button
                    onClick={() => {
                      startTransition(() => {
                        void deleteExperience(exp.id);
                      });
                    }}
                    disabled={isPending}
                    className="p-1.5 text-secondary hover:text-error rounded hover:bg-error-container/30 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}