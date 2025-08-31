"use client";
import "client-only";
import { useEffect } from "react";

interface LeadTrackerProps {
  source?: string;
  page?: string;
}


/**
 * Lead Tracker Component
 * Tracks user interactions and page visits for Go High Level integration
 */
export default function LeadTracker({ source = 'Website', page }: LeadTrackerProps) {
  useEffect(() => {
    // Track page visit
    const trackPageVisit = async () => {
      try {
        // Get or create visitor ID
        let visitorId = localStorage.getItem('ghl_visitor_id');
        if (!visitorId) {
          visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('ghl_visitor_id', visitorId);
        }

        // Track the page visit
        const visitData = {
          visitorId,
          source,
          page: page || window.location.pathname,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        };

        // Store visit data for potential lead creation
        const existingVisits = JSON.parse(localStorage.getItem('ghl_visits') || '[]');
        existingVisits.push(visitData);
        
        // Keep only last 10 visits to avoid storage bloat
        if (existingVisits.length > 10) {
          existingVisits.splice(0, existingVisits.length - 10);
        }
        
        localStorage.setItem('ghl_visits', JSON.stringify(existingVisits));

        // Google Analytics tracking would go here
        console.log('Page view tracked:', { source, page: page || window.location.pathname });

      } catch (error) {
        console.error('Error tracking page visit:', error);
      }
    };

    trackPageVisit();
  }, [source, page]);

  // Track scroll depth
  useEffect(() => {
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track significant scroll milestones
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          console.log('Scroll milestone:', `${scrollPercent}%`);
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    return () => window.removeEventListener('scroll', trackScrollDepth);
  }, []);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      // Track significant time milestones
      if ([30, 60, 120, 300].includes(timeSpent)) {
        console.log('Time milestone:', `${timeSpent}s`);
      }
    };

    const interval = setInterval(trackTimeOnPage, 1000);
    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Utility function to get visitor tracking data
 * Can be used when creating leads to include visit history
 */
export function getVisitorTrackingData() {
  if (typeof window === 'undefined') return null;
  
  try {
    const visitorId = localStorage.getItem('ghl_visitor_id');
    const visits = JSON.parse(localStorage.getItem('ghl_visits') || '[]');
    
    return {
      visitorId,
      visits,
      totalVisits: visits.length,
      firstVisit: visits[0]?.timestamp,
      lastVisit: visits[visits.length - 1]?.timestamp,
      sources: [...new Set(visits.map((v: { source: string }) => v.source))],
      pages: [...new Set(visits.map((v: { page: string }) => v.page))]
    };
  } catch (error) {
    console.error('Error getting visitor tracking data:', error);
    return null;
  }
}

/**
 * Utility function to track custom events
 */
export function trackCustomEvent(eventName: string, eventData: Record<string, unknown> = {}) {
  try {
    // Google Analytics tracking would go here
    console.log('Custom event tracked:', eventName, eventData);

    // Store custom event for potential lead creation
    const customEvents = JSON.parse(localStorage.getItem('ghl_custom_events') || '[]');
    customEvents.push({
      event: eventName,
      data: eventData,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 20 events
    if (customEvents.length > 20) {
      customEvents.splice(0, customEvents.length - 20);
    }
    
    localStorage.setItem('ghl_custom_events', JSON.stringify(customEvents));
  } catch (error) {
    console.error('Error tracking custom event:', error);
  }
}
