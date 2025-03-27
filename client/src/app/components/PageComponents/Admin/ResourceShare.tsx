import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';


import {
  FacebookIcon,
  TwitterIcon,
  InstapaperIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';
import InstagramIcon from '@mui/icons-material/Instagram';

type ArticleShareProps = {
  resourceUrl: string;
  title: string;
};

const ResourceShare = ({ resourceUrl, title }: ArticleShareProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        url: resourceUrl,
      });
    } catch (error) {
      console.log('Native share not supported', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resourceUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 flex-col justify-center w-full p-3 space-y-4 h-44">

      <div className='flex items-center gap-4'>
        <p className="text-sm font-semibold text-saitBlack">Share Link</p>
      </div>

      <div className="flex flex-col justify-evenly h-max w-full rounded-lg p-3 mt-3 sm:flex-row bg-[rgba(65,47,123,0.15)] 
            gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
        {/* Native share button (works on mobile) */}
          {/* <button
            onClick={handleNativeShare}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            aria-label="Share"
          >
            <ShareIcon />
          </button> */}

        {/* Email */}
        <IconButton
          href={`mailto:?subject=${title}&body=${resourceUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Share via Email"
        >
          <EmailIcon size={24} round />
        </IconButton>
        
        <IconButton
          href={'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(resourceUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Share on LinkedIn"
        >
          <LinkedinIcon size={24} round />
        </IconButton>

        {/* <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' - ' + resourceUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Share on WhatsApp"
        >
          <WhatsappIcon size={24} round />
        </a> */}

        <IconButton
          href={`https://www.instagram.com/`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Share on Instagram"
        >
          <InstagramIcon />
        </IconButton>


        <IconButton
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resourceUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Share on Facebook"
        >
          <FacebookIcon size={24} round />
        </IconButton>
        
        <IconButton
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(resourceUrl)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Share on Twitter"
        >
          <TwitterIcon size={24} round />
        </IconButton>
      </div>

      <div className="flex flex-row justify-between items-center w-full gap-1">
        <div className='flex items-center gap-1 flex-col'>
          <input
            type="text"
            value={resourceUrl}
            className="font-light text-xs w-[18rem] px-3 p-2 mb-3 border border-gray-400 bg-[rgba(65,47,123,0.15)] mt-1 rounded-xl focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent"
            id="share-link"
            readOnly
          />
        </div>
        <IconButton
          onClick={copyToClipboard}
          className="flex items-center gap-1 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          aria-label="Copy link"
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>

        {isCopied && (
            <div className="flex items-center gap-1 text-xs border border-saitBlue text-saitBlue absolute bottom-9 right-16 z-50 rounded-full bg-gray-100 p-2">
              <p className="text-xs text-saitBlueOg">Copied!</p>
            </div>
          )}
      </div>

    </div>
  );
};

export default ResourceShare;