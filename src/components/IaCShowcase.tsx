"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const modules = [
  {
    id: "ecs",
    name: "ECS Cluster",
    file: "ecs-cluster.tf",
    code: `resource "aws_ecs_cluster" "main" {
  name = "thinkai-prod"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

capacity_providers = ["FARGATE"]`,
  },
  {
    id: "rds",
    name: "PostgreSQL",
    file: "rds.tf",
    code: `resource "aws_db_instance" "postgres" {
  identifier           = "thinkai-db"
  engine               = "postgres"
  engine_version      = "15.4"
  instance_class      = "db.t3.micro"
  allocated_storage  = 20

  backup_retention_period = 7
  skip_final_snapshot = true`,
  },
  {
    id: "elasticache",
    name: "Redis",
    file: "elasticache.tf",
    code: `resource "aws_elasticache_cluster" "redis" {
  cluster_id         = "thinkai-cache"
  engine           = "redis"
  node_type        = "cache.t3.micro"
  num_cache_nodes = 1
  engine_version  = "7.0"

  parameter_group_name = "default.redis7",
}`,
  },
  {
    id: "vpc",
    name: "VPC Network",
    file: "vpc.tf",
    code: `module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "thinkai-network"
  cidr = "10.0.0.0/16"

  azs             = ["ap-southeast-1a", "ap-southeast-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]`,
  },
];

export function IaCShowcase() {
  const { t, language } = useLanguage();
  const [activeModule, setActiveModule] = useState(modules[0]);

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Infrastructure as Code</h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi"
              ? "Terraform modules quản lý hạ tầng production"
              : "Terraform modules managing production infrastructure"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Module List */}
          <div className="lg:col-span-1 space-y-1">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module)}
                className={`w-full text-left px-4 py-3 text-sm font-mono transition-colors ${
                  activeModule.id === module.id
                    ? "bg-black text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {module.name}
              </button>
            ))}
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2 bg-[#1e1e1e] rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-2 border-b border-[#3d3d3d]">
              <span className="text-xs text-gray-400 font-mono">{activeModule.file}</span>
            </div>
            <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto whitespace-pre">
              <code>{activeModule.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}