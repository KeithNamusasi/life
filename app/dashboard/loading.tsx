export default function DashboardLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between space-y-2">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl border bg-card p-6">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                ))}
            </div>

            {/* Chart Skeleton */}
            <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-xl border bg-card p-6 lg:col-span-1">
                    <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="rounded-xl border bg-card p-6 lg:col-span-2">
                    <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
            </div>
        </div>
    )
}
