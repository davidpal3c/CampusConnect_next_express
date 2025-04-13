"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import domToReact from "html-react-parser/lib/dom-to-react";


const ArticleContent = ({ content }: { content: string }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const processContent = (html: string) => {
        const cleanHtml = DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br'],
            ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style', 'width', 'height']
        });

        return parse(cleanHtml, {
            replace: (domNode: any) => {
                
                // handle images
                if (domNode.name === 'img') {
                    return (
                        <div className="relative w-full h-auto my-4" style={{ maxHeight: '400px' }}>
                            <Image
                                src={domNode.attribs.src}
                                alt={domNode.attribs.alt || 'Article image'}
                                fill
                                style={{ objectFit: 'contain' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                className="rounded-md"
                                loading="lazy"
                            />
                        </div>
                    );
                }

                // Fix invalid paragraph nesting
                if (domNode.name === 'p' && domNode.children) {
                    const hasBlockElements = domNode.children.some(
                        (child: any) => child.type === 'tag' && ['div', 'img', 'figure', 'ul', 'ol'].includes(child.name)
                    );

                    if (hasBlockElements) {
                        return (
                        <div className="paragraph-wrapper">
                            {domToReact(domNode.children, {
                            replace: (childNode: any) => {
                                if (childNode.name === 'img') {
                                return (
                                    <div className="relative w-full h-auto my-4" style={{ maxHeight: '400px' }}>
                                    <Image
                                        src={childNode.attribs.src}
                                        alt={childNode.attribs.alt || 'Article image'}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                        className="rounded-md"
                                        loading="lazy"
                                    />
                                    </div>
                                );
                                }
                                return undefined;
                            }
                            })}
                        </div>
                        );
                    }
                }

                return undefined;
            }
        });
    };

  if (!isMounted) return null;

  return (
    <div className="prose max-w-inherit">
      {processContent(content)}
    </div>
  );
};

export default ArticleContent;