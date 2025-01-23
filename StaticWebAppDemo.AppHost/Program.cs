var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.StaticWebAppDemo_ApiService>("apiservice");

builder.AddProject<Projects.StaticWebAppDemo_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(apiService);

var web = builder.AddNpmApp("web", Path.Combine("..", "front-end"), "dev")
        .WithReference(apiService)
        .WaitFor(apiService)
        .WithHttpEndpoint(env: "PORT")
        .WithExternalHttpEndpoints()
        .PublishAsDockerFile();

_ = builder
        .AddSwaEmulator("swa")
        .WithAppResource(web)
        .WithApiResource(apiService);

builder.Build().Run();
