import { ProtectedPageLayout } from '@/components/layout/ProtectedPageLayout';

const MarketResearchPage = () => {
  return (
    <ProtectedPageLayout
      title="Market Research"
      description="Conduct and analyze market research for acquisitions"
      breadcrumbs={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Market Research', href: '/market-research' }
      ]}
    >
      <div className="min-h-[calc(100vh-200px)]">
        <Container>
          <PageHeader
            title="Market Research"
            description="Analyze market trends and vendor performance"
          />

          <Grid columns={3} gap="lg" className="mb-8">
            <Card>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Active Vendors</h3>
                  <p className="text-2xl font-bold text-white">234</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-fuchsia-500/20 rounded-lg flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-fuchsia-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    Avg Performance
                  </h3>
                  <p className="text-2xl font-bold text-white">91%</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Market Growth</h3>
                  <p className="text-2xl font-bold text-white">+12.5%</p>
                </div>
              </div>
            </Card>
          </Grid>

          <Card className="mb-8">
            <div className="p-4 sm:p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Performance Trends
              </h2>
              <MetricsChart data={mockData} type="line" />
            </div>
          </Card>

          <Card>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold text-white">Top Vendors</h2>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search vendors..."
                      className="pl-10 bg-white/5 border-white/10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="border-white/10 w-full sm:w-auto">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {mockVendors.map((vendor) => (
                  <Card
                    key={vendor.id}
                    className="hover:bg-white/5 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="text-lg font-medium text-white">
                          {vendor.name}
                        </h3>
                        <p className="text-sm text-gray-400">{vendor.category}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
                        <div className="grid grid-cols-3 sm:flex gap-4 sm:gap-8 w-full sm:w-auto">
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Rating</p>
                            <p className="text-lg font-semibold text-white">
                              {vendor.rating}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Contracts</p>
                            <p className="text-lg font-semibold text-white">
                              {vendor.contracts}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Performance</p>
                            <p className="text-lg font-semibold text-white">
                              {vendor.performance}%
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" className="border-white/10 w-full sm:w-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </Container>
      </div>
    </ProtectedPageLayout>
  );
};

export default MarketResearchPage;
