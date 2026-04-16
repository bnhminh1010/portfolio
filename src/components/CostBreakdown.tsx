"use client";

import { useState } from "react";
import { DollarSign, TrendingDown, Server, Database, HardDrive, Globe } from "lucide-react";

const costData = [
  { category: "Compute (EC2/ECS)", amount: 24.5, icon: Server, color: "bg-gray-800" },
  { category: "Database (RDS)", amount: 18.0, icon: Database, color: "bg-gray-600" },
  { category: "Storage (S3)", amount: 3.2, icon: HardDrive, color: "bg-gray-400" },
  { category: "CDN (CloudFront)", amount: 2.1, icon: Globe, color: "bg-gray-200" },
];

const optimizations = [
  { saved: "$4.50/mo", action: "Reserved Instances", status: "savings" },
  { saved: "$1.20/mo", action: "S3 Lifecycle Policies", status: "savings" },
  { saved: "$0.80/mo", action: "CloudFront Compression", status: "savings" },
];

export function CostBreakdown() {
  const total = costData.reduce((sum, item) => sum + item.amount, 0);
  const potentialSavings = optimizations.reduce((sum, item) => sum + parseFloat(item.saved.replace("$", "").replace("/mo", "")), 0);

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            Cloud Cost
          </h2>
          <p className="text-sm text-gray-500 mt-1">Monthly breakdown & optimization opportunities</p>
        </div>

        {/* Total */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">${total.toFixed(2)}</span>
            <span className="text-sm text-gray-500">/month</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <TrendingDown className="w-3 h-3 text-green-600" />
            <span>-8% vs last month</span>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {costData.map((item) => (
            <div key={item.category} className="p-4 border border-gray-200">
              <div className={`w-8 h-8 ${item.color} rounded flex items-center justify-center mb-3`}>
                <item.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-xl font-bold">${item.amount}</div>
              <div className="text-xs text-gray-500 truncate">{item.category}</div>
            </div>
          ))}
        </div>

        {/* Optimizations */}
        <div className="bg-gray-50 p-4">
          <h3 className="text-sm font-medium mb-3">Potential Savings</h3>
          <div className="space-y-2">
            {optimizations.map((opt, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{opt.action}</span>
                <span className="text-green-600 font-medium">{opt.saved}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-medium">
              <span>Total potential</span>
              <span className="text-green-600">${(total - potentialSavings).toFixed(2)}/mo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}