import React from 'react';
import { ScooterSpecs } from '../lib/types';
import {
  Zap,
  BatteryCharging,
  Gauge,
  ShieldCheck,
  Scale,
  Award,
  type LucideIcon,
} from 'lucide-react';

interface ScooterSpecsTableProps {
  specs: ScooterSpecs;
}

interface SpecGroup {
  label: string;
  icon: LucideIcon;
  items: { label: string; value: string }[];
}

export const ScooterSpecsTable: React.FC<ScooterSpecsTableProps> = ({ specs }) => {
  const groups: SpecGroup[] = [
    {
      label: 'Powertrain',
      icon: Zap,
      items: [
        { label: 'Rated motor power', value: specs.motorPower },
        { label: 'Peak output', value: specs.peakPower },
      ],
    },
    {
      label: 'Battery & range',
      icon: BatteryCharging,
      items: [
        { label: 'Battery', value: specs.battery },
        { label: 'Range', value: specs.range },
        { label: 'Charging time', value: specs.chargingTime },
      ],
    },
    {
      label: 'Performance',
      icon: Gauge,
      items: [{ label: 'Top speed', value: specs.topSpeed }],
    },
    {
      label: 'Chassis & safety',
      icon: ShieldCheck,
      items: [
        { label: 'Brakes', value: specs.brakes },
        { label: 'Suspension', value: specs.suspension },
        { label: 'Tires', value: specs.tires },
      ],
    },
    {
      label: 'Dimensions',
      icon: Scale,
      items: [
        { label: 'Weight', value: specs.weight },
        { label: 'Max load', value: specs.maxLoad },
      ],
    },
    {
      label: 'Coverage',
      icon: Award,
      items: [{ label: 'Warranty', value: specs.warranty }],
    },
  ];

  return (
    <section className="rounded-3xl border border-line bg-card p-6 shadow-card sm:p-8 lg:p-10">
      <div className="space-y-2">
        <p className="eyebrow">
          <span className="h-px w-6 bg-brand-600/60" aria-hidden />
          Specifications
        </p>
        <h2 className="font-display text-2xl font-bold text-ink">Technical details</h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        {groups.map(({ label, icon: Icon, items }) => (
          <div key={label}>
            <div className="flex items-center gap-2.5 pb-3">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-600">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                {label}
              </p>
            </div>

            <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
              {items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-page-alt"
                >
                  <dt className="text-sm text-muted">{item.label}</dt>
                  <dd className="text-right text-sm font-semibold text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
};
