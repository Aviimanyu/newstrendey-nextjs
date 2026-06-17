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
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 40px 20px;
            line-height: 1.5;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          header {
            background: linear-gradient(135deg, #1e3a8a 0%, #1b5f8a 100%);
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
            font-weight: 300 lead;
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
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4.5px -1px rgba(0, 0, 0, 0.03);
            border: 1px solid #e2e8f0;
            overflow: hidden;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 14px;
          }
          th {
            background-color: #f1f5f9;
            color: #475569;
            font-weight: 600;
            padding: 16px 20px;
            border-bottom: 1px solid #e2e8f0;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.05em;
          }
          td {
            padding: 16px 20px;
            border-bottom: 1px solid #f1f5f9;
            word-break: break-all;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          a {
            color: #1b5f8a;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.15s ease;
          }
          a:hover {
            color: #1e3a8a;
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
            background-color: #eff6ff;
            color: #1d4ed8;
          }
          .badge-freq {
            background-color: #f0fdf4;
            color: #166534;
          }
          .badge-lang {
            background-color: #f5f3ff;
            color: #5b21b6;
            margin-right: 4px;
            margin-bottom: 4px;
          }
          .alternates-list {
            margin-top: 8px;
            font-size: 12px;
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
          }
          .lastmod-time {
            color: #64748b;
            font-family: monospace;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
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
                          
                          <!-- Render dynamic alternates/hreflangs if they exist -->
                          <xsl:if test="xhtml:link">
                            <div class="alternates-list">
                              <xsl:for-each select="xhtml:link">
                                <span class="badge badge-lang">
                                  <xsl:value-of select="@hreflang" />: 
                                  <a href="{@href}" style="font-size: 11px; font-weight: normal; color: inherit;">link</a>
                                </span>
                              </xsl:for-each>
                            </div>
                          </xsl:if>
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
                            <div style="font-size: 11px; color: #64748b;">
                              Published: <span class="lastmod-time"><xsl:value-of select="news:news/news:publication_date" /></span>
                            </div>
                          </xsl:if>
                          
                          <!-- Standard Lastmod if it exists and not news sitemap -->
                          <xsl:if test="sitemap:lastmod and not(news:news)">
                            <div style="font-size: 11px; color: #64748b;">
                              Last Modified: <span class="lastmod-time"><xsl:value-of select="sitemap:lastmod" /></span>
                            </div>
                          </xsl:if>

                          <!-- Standard Images if they exist -->
                          <xsl:if test="image:image">
                            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">
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
