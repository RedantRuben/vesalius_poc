'use client';

import { useState, useMemo } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Types
interface FAQItem {
  id: string;
  question: string;
  excerpt: string;
  answer: string;
  date: string;
  tags: string[];
}

// FAQ Data
const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "How does automatic sending of doctor-specific questionnaires via the calendar work?",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "Nov 26, 2025",
    tags: ["Conversations", "Customise"]
  },
  {
    id: "2",
    question: "How does Smart Scheduling of Conversations work?",
    excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia...",
    answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "Nov 26, 2025",
    tags: ["Conversations"]
  },
  {
    id: "3",
    question: "How can I group rooms in the calendar?",
    excerpt: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati...",
    answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.",
    date: "Nov 26, 2025",
    tags: ["Account management", "Customise"]
  },
  {
    id: "4",
    question: "Using Vesalius Scribe as a stand-alone module (no pre-conversation needed)",
    excerpt: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus...",
    answer: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
    date: "Nov 6, 2025",
    tags: ["Summary"]
  },
  {
    id: "5",
    question: "How can I customise the format of the Scribe bot summary?",
    excerpt: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto...",
    answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    date: "Aug 1, 2025",
    tags: ["Summary", "Customise"]
  },
  {
    id: "6",
    question: "How can I prevent the patient initiated chatbot from asking for the appointment date?",
    excerpt: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam...",
    answer: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    date: "Aug 1, 2025",
    tags: ["Patient initiated chatbot", "Customise"]
  },
  {
    id: "7",
    question: "How can I create a unique link to send a specific questionnaire?",
    excerpt: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit...",
    answer: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.",
    date: "Aug 1, 2025",
    tags: ["Patient initiated chatbot", "Conversations"]
  },
  {
    id: "8",
    question: "How can I choose which identification details the patient initiated chatbot asks the patients?",
    excerpt: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic...",
    answer: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
    date: "Aug 1, 2025",
    tags: ["Patient initiated chatbot", "Access management"]
  },
  {
    id: "9",
    question: "How can I create or edit a questionnaire?",
    excerpt: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere...",
    answer: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore.",
    date: "Jun 27, 2025",
    tags: ["Conversations", "Customise"]
  },
  {
    id: "10",
    question: "How can I indicate that the summary has been copied to the EHR?",
    excerpt: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur...",
    answer: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    date: "Jun 27, 2025",
    tags: ["Summary"]
  }
];

// Get all unique tags
const allTags = Array.from(new Set(faqItems.flatMap(item => item.tags))).sort();

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

const ITEMS_PER_PAGE = 5;

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return faqItems.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === null || item.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  return (
    <main className="w-full bg-white relative selection:bg-primary/20 min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B3B53] mb-8 tracking-tight">
            Frequently Asked Questions
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white text-[#2B3B53] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06ACC1]/50 focus:border-[#06ACC1] transition-all shadow-sm"
            />
          </div>

          {/* Active filters indicator */}
          {(selectedTag || searchQuery) && (
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
              {selectedTag && (
                <button
                  onClick={() => handleTagChange(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#06ACC1]/10 text-[#06ACC1] text-sm font-medium hover:bg-[#06ACC1]/20 transition-colors"
                >
                  {selectedTag}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  &quot;{searchQuery}&quot;
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Cards Section */}
      <section className="w-full pb-16 bg-white flex-1">
        <div className="max-w-7xl mx-auto px-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No results found. Try a different search term or filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#06ACC1]/20 transition-all duration-300 cursor-pointer group"
                >
                  <h3 className="text-lg font-semibold text-[#2B3B53] group-hover:text-[#06ACC1] transition-colors mb-3">
                    {item.question}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <CalendarIcon />
                    <span>{item.date}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTagChange(tag === selectedTag ? null : tag);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          tag === selectedTag
                            ? 'bg-[#06ACC1] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-[#06ACC1]/10 hover:text-[#06ACC1]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tags Section */}
      <section className="w-full pt-8 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* About */}
            <div className="md:flex-1">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-4">About us</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                On this page, you can find all the FAQs for the Vesalius.ai platform. 
                If you can&apos;t find your answer, you can always contact us through the contact form.
              </p>
            </div>
            
            {/* Tags */}
            <div className="md:flex-1">
              <h2 className="text-xl font-bold text-[#2B3B53] mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagChange(tag === selectedTag ? null : tag)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      tag === selectedTag
                        ? 'bg-[#06ACC1] text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-[#06ACC1] hover:text-[#06ACC1]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-[#06ACC1] text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-[#06ACC1] hover:text-[#06ACC1]'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
