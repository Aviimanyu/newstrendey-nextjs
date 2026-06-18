<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  exclude-result-prefixes="sitemap xhtml image news"
>
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap | NewsTrendey</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet" />
        <style>
          :root {
            --bg-color: #f8fafc;
            --text-color: #1e293b;
            --card-bg: #ffffff;
            --header-grad-start: #1e3a8a;
            --header-grad-end: #1b5f8a;
            --border-color: #e2e8f0;
            --th-bg: #f1f5f9;
            --th-text: #475569;
            --tr-hover: #f8fafc;
            --link-color: #1b5f8a;
            --link-hover: #1e3a8a;
            --badge-priority-bg: #eff6ff;
            --badge-priority-text: #1d4ed8;
            --badge-freq-bg: #f0fdf4;
            --badge-freq-text: #166534;
            --badge-lang-bg: #f5f3ff;
            --badge-lang-text: #5b21b6;
            --muted-text: #64748b;
          }

          /* Explicit Support for Dark Mode */
          @media (prefers-color-mode: dark) {
            :root {
              --bg-color: #0b1329;
              --text-color: #f1f5f9;
              --card-bg: #111b35;
              --header-grad-start: #070e20;
              --header-grad-end: #1b5f8a;
              --border-color: #1e294b;
              --th-bg: #172544;
              --th-text: #94a3b8;
              --tr-hover: #16223f;
              --link-color: #38bdf8;
              --link-hover: #7dd3fc;
              --badge-priority-bg: #1e3a8a;
              --badge-priority-text: #93c5fd;
              --badge-freq-bg: #064e3b;
              --badge-freq-text: #6ee7b7;
              --badge-lang-bg: #3b0764;
              --badge-lang-text: #c084fc;
              --muted-text: #94a3b8;
            }
          }

          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            padding: 40px 20px;
            line-height: 1.5;
            transition: background-color 0.2s ease, color 0.2s ease;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          header {
            background: linear-gradient(135deg, var(--header-grad-start) 0%, var(--header-grad-end) 100%);
            color: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 25px -5px rgba(27, 95, 138, 0.15), 0 8px 10px -6px rgba(27, 95, 138, 0.15);
            margin-bottom: 30px;
          }
          h1 {
            margin: 0 0 10px 0;
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.025em;
          }
          p.lead {
            margin: 0 0 20px 0;
            font-size: 16px;
            color: #e2e8f0;
            font-weight: 300;
          }
          .stats {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }
          .stat-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(8px);
            padding: 12px 20px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            font-size: 14px;
          }
          .stat-card strong {
            font-size: 18px;
            display: block;
            font-weight: 700;
          }
          .table-container {
            background: var(--card-bg);
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4.5px -1px rgba(0, 0, 0, 0.03);
            border: 1px solid var(--border-color);
            overflow: hidden;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 14px;
          }
          th {
            background-color: var(--th-bg);
            color: var(--th-text);
            font-weight: 600;
            padding: 16px 20px;
            border-bottom: 1px solid var(--border-color);
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.05em;
          }
          td {
            padding: 16px 20px;
            border-bottom: 1px solid var(--border-color);
            word-break: break-all;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: var(--tr-hover);
          }
          a {
            color: var(--link-color);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.15s ease;
          }
          a:hover {
            color: var(--link-hover);
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
          }
          .badge-priority {
            background-color: var(--badge-priority-bg);
            color: var(--badge-priority-text);
          }
          .badge-freq {
            background-color: var(--badge-freq-bg);
            color: var(--badge-freq-text);
          }

          .lastmod-time {
            color: var(--muted-text);
            font-family: monospace;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: var(--muted-text);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>NewsTrendey XML Sitemap</h1>
            <p class="lead">Generated dynamically to optimize indexation and crawling across Google and Bing engines.</p>
            <div class="stats">
              <div class="stat-card">
                <strong>
                  <xsl:choose>
                    <xsl:when test="sitemap:sitemapindex">
                      <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
                    </xsl:otherwise>
                  </xsl:choose>
                </strong>
                Total Entries
              </div>
              <div class="stat-card">
                <strong>
                  <xsl:choose>
                    <xsl:when test="sitemap:sitemapindex">Sitemap Index</xsl:when>
                    <xsl:otherwise>URL Set</xsl:otherwise>
                  </xsl:choose>
                </strong>
                Sitemap Type
              </div>
            </div>
          </header>

          <div class="table-container">
            <xsl:choose>
              <!-- SITEMAP INDEX -->
              <xsl:when test="sitemap:sitemapindex">
                <table>
                  <thead>
                    <tr>
                      <th style="width: 70%;">Sitemap URL</th>
                      <th style="width: 30%;">Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                      <xsl:sort select="sitemap:loc" />
                      <tr>
                        <td>
                          <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a>
                        </td>
                        <td>
                          <span class="lastmod-time"><xsl:value-of select="sitemap:lastmod" /></span>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:when>

              <!-- URL SET -->
              <xsl:otherwise>
                <table>
                  <thead>
                    <tr>
                      <th style="width: 50%;">Location URL</th>
                      <th style="width: 10%;">Priority</th>
                      <th style="width: 15%;">Change Freq.</th>
                      <th style="width: 25%;">Details / Alternates</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:urlset/sitemap:url">
                      <tr>
                        <td>
                          <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a>
                          

                        </td>
                        <td>
                          <span class="badge badge-priority">
                            <xsl:choose>
                              <xsl:when test="sitemap:priority">
                                <xsl:value-of select="sitemap:priority" />
                              </xsl:when>
                              <xsl:otherwise>0.5</xsl:otherwise>
                            </xsl:choose>
                          </span>
                        </td>
                        <td>
                          <span class="badge badge-freq">
                            <xsl:choose>
                              <xsl:when test="sitemap:changefreq">
                                <xsl:value-of select="sitemap:changefreq" />
                              </xsl:when>
                              <xsl:otherwise>weekly</xsl:otherwise>
                            </xsl:choose>
                          </span>
                        </td>
                        <td>
                          <!-- If sitemap is a Google News sitemap, display title -->
                          <xsl:if test="news:news">
                            <div style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">
                              <xsl:value-of select="news:news/news:title" />
                            </div>
                            <div style="font-size: 11px; color: var(--muted-text);">
                              Published: <span class="lastmod-time"><xsl:value-of select="news:news/news:publication_date" /></span>
                            </div>
                          </xsl:if>
                          
                          <!-- Standard Lastmod if it exists and not news sitemap -->
                          <xsl:if test="sitemap:lastmod and not(news:news)">
                            <div style="font-size: 11px; color: var(--muted-text);">
                              Last Modified: <span class="lastmod-time"><xsl:value-of select="sitemap:lastmod" /></span>
                            </div>
                          </xsl:if>

                          <!-- Standard Images if they exist -->
                          <xsl:if test="image:image">
                            <div style="font-size: 11px; color: var(--muted-text); margin-top: 4px;">
                              Images: 
                              <a href="{image:image/image:loc}" target="_blank">
                                <xsl:choose>
                                  <xsl:when test="image:image/image:title">
                                    <xsl:value-of select="image:image/image:title" />
                                  </xsl:when>
                                  <xsl:otherwise>View Image</xsl:otherwise>
                                </xsl:choose>
                              </a>
                            </div>
                          </xsl:if>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:otherwise>
            </xsl:choose>
          </div>
          <div class="footer">
            NewsTrendey XML Sitemap • Styled dynamically using XSLT Stylesheet
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
