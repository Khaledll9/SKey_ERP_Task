import { Component, Input, booleanAttribute, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SkeyButtonComponent } from '../../shared/ui/button/button';
import { SkeyCardComponent } from '../../shared/ui/card/card';

interface Feature {
  icon: SafeHtml | string;
  bg: string;
  iconColor: string;
  title: string;
  desc: string;
}

interface Sector {
  icon: SafeHtml | string;
  label: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, SkeyButtonComponent, SkeyCardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {
  private sanitizer = inject(DomSanitizer);

  @Input({ transform: booleanAttribute }) embedded = false;

  protected readonly partners = ['APEX', 'Pinnacle', 'NexGen', 'ELITE', 'InnoTech'];

  protected readonly features: Feature[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>`,
       bg: '#ede9fe',
      iconColor: '#8b5cf6',
      title: 'المحاسبة المتكاملة',
      desc: 'إدارة كاملة لدورة المحاسبة والمدفوعات بكل سهولة وبالرقمية الإلكترونية.',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>`,
       bg: '#d1fae5',
      iconColor: '#10b981',
      title: 'إدارة المنتجات',
      desc: 'تتبع المخزون بشكل تلقائي وذكي مع تنبيهات استفاد ونقص الكميات.',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>`,
      bg: '#fef3c7',
      iconColor: '#f59e0b',
      title: 'الفواتير الذكية',
      desc: 'احصل على تقارير مالية شاملة وتحليلية توفر رؤية دقيقة عن أداء شركتك.',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>`,
      bg: '#ede9fe',
      iconColor: '#8b5cf6',
      title: 'نقاط البيع',
      desc: 'نقاط بيع سريعة وفعالة تدعم المدفوعات والفواتير المتعددة بسهولة.',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg>`,
      bg: '#d1fae5',
      iconColor: '#10b981',
      title: 'تقارير متقدمة',
      desc: 'بناء علاقات عملاء قوية مع نظام CRM متكامل لمتابعة وتحليل بيانات العملاء.',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" width="22" height="22"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>`,
      bg: '#fef3c7',
      iconColor: '#f59e0b',
      title: 'ادارة العملاء',
      desc: 'احصل على نظرة ثاقبة حول مخصصة لعملك مع تقارير قابلة للتخصيص والتصدير.',
    },
  ];

  protected readonly sectors: Sector[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-9"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5v6M9 10.5v6M3.75 6h16.5M3.75 6l1.5 9h13.5l1.5-9M3.75 6H18m-6-4a5 5 0 0 0-5 5v2h10V7a5 5 0 0 0-5-5z" /></svg>`,
      label: 'سوبر ماركت',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-9"><path stroke-linecap="round" stroke-linejoin="round" d="M10 7.5h4M12 7.5V5m0 0V3m0 2h3.5a1.5 1.5 0 0 1 1.5 1.5V7m0 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM6 10a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10z" /></svg>`,
      label: 'عطور ومواد عناية',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-9"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V4.5a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 15 4.5v2.25m-9 0h12A2.25 2.25 0 0 1 20.25 9v9a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18V9A2.25 2.25 0 0 1 6 6.75zm6 4.25v5.5m-2.75-2.75h5.5" /></svg>`,
      label: 'صيدليات',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-9"><path stroke-linecap="round" stroke-linejoin="round" d="M6 3v7a3 3 0 0 0 3 3v8M9 3v5M12 3v7a3 3 0 0 1-3 3M18 3v18M18 3h2.5a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-2.5 2.5H18" /></svg>`,
      label: 'مطاعم وكافيهات',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-9"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.25v13.5m4.5-13.5l10.5 6.75-10.5 6.75V5.25z" /></svg>`,
      label: 'إعلام وترفيه',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-9"><path stroke-linecap="round" stroke-linejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /><path stroke-linecap="round" stroke-linejoin="round" d="m19 5-4 4M21.5 6.5a2.12 2.12 0 0 0-3-3L11 11l3 3z" /></svg>`,
      label: 'مراكز صيانة',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-9"><rect x="2.25" y="3.75" width="13.5" height="10.5" rx="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M6 14.25v3.75M12 14.25v3.75M3.75 18h10.5" stroke-linecap="round" stroke-linejoin="round" /><rect x="15.75" y="8.25" width="6" height="12" rx="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M18.75 17.25h.008v.008h-.008v-.008z" stroke-linecap="round" stroke-linejoin="round" /></svg>`,
      label: 'إلكترونيات',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-9"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 21V8.25a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 .75.75V21m0-12.75l5.25-3a.75.75 0 0 1 1.07.67V21M7.5 11.25h.008v.008H7.5v-.008zm0 3.75h.008v.008H7.5v-.008zm0 3.75h.008v.008H7.5v-.008zm6-7.5h.008v.008h-.008v-.008zm0 3.75h.008v.008h-.008v-.008zm0 3.75h.008v.008h-.008v-.008z" /></svg>`,
      label: 'شركات عقارية',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-9"><path stroke-linecap="round" stroke-linejoin="round" d="M18 3H6a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h6v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 8.25h12M7.5 13.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" /></svg>`,
      label: 'خدمات المواصلات',
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="size-9"><circle cx="12" cy="12" r="2.25" /><circle cx="5" cy="12" r="2.25" /><circle cx="19" cy="12" r="2.25" /></svg>`,
      label: 'والمزيد',
    },
  ];

  constructor() {
    this.features = this.features.map((f) => ({
      ...f,
      icon: this.sanitizer.bypassSecurityTrustHtml(f.icon as string),
    }));
    this.sectors = this.sectors.map((s) => ({
      ...s,
      icon: this.sanitizer.bypassSecurityTrustHtml(s.icon as string),
    }));
  }
}
